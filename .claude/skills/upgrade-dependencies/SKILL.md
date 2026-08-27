---
name: upgrade-dependencies
description: Upgrade this portfolio's npm dependencies and fix package vulnerabilities. Use when asked to update/bump packages, refresh the lockfile, resolve `pnpm audit` findings, or handle Dependabot-style dependency issues.
---

# Upgrade dependencies

Repeatable procedure for the periodic "deps: upgrade dependencies" pass on this repo.
Ship a single commit that bumps versions, closes audit findings, and keeps CI green.

## 0. Rules that are easy to get wrong

- **pnpm only** (`>= 10`). Never npm or yarn.
- `pnpm-workspace.yaml` sets `minimumReleaseAge: 5760` (4 days). Packages published more
  recently are invisible to the resolver. **Always take target versions from
  `pnpm outdated`**, never from `pnpm view <pkg> version` — the latter reports releases the
  resolver will refuse, and `pnpm install` will silently keep the old version.
  Seeing `+ daisyui 5.7.18 (5.7.20 is available)` in the install output is expected.
- `.npmrc` has `save-exact=true`, but `package.json` is maintained with **caret ranges**.
  Edit `package.json` by hand (or with a script) instead of `pnpm add`/`pnpm update --latest`,
  which would rewrite every range to an exact version.
- Keep the two deliberate pins:
  - `next-plausible` is pinned exact (`4.0.0`) — leave it alone unless asked.
  - `@types/node` stays on the **major that matches `.nvmrc`** (currently Node 24 → `^24.x`).
    Do not follow `pnpm outdated` to the next major here.

## 1. Baseline

```bash
pnpm install
pnpm outdated
pnpm audit
```

Record the vulnerability count so the final report can show before/after.

## 2. Bump the non-major versions

Rewrite the `dependencies` / `devDependencies` values in `package.json` to the caret range of
each version reported by `pnpm outdated`, skipping majors, then:

```bash
pnpm install
```

Majors get their own evaluation in step 4 — one at a time.

## 3. Close the remaining audit findings

```bash
pnpm audit
```

Anything left is a **transitive** dependency. Pin it through `pnpm.overrides` in `package.json`,
using a major-scoped selector so the override cannot silently jump a major:

```json
"pnpm": {
  "overrides": {
    "brace-expansion@1": "^1.1.18",
    "brace-expansion@>=4": "^5.0.9",
    "fast-uri@3": "^3.1.5",
    "js-yaml@4": "^4.3.1",
    "svgo@3": "^3.3.4"
  }
}
```

Pick the lowest patched version inside the installed major — check what exists with
`pnpm view <pkg> versions --json`, and confirm the installed graph afterwards:

```bash
pnpm install
grep -nE "^  (brace-expansion|js-yaml|fast-uri|svgo)@" pnpm-lock.yaml
```

An advisory whose `patched_versions` is `<0.0.0` has **no upstream fix** — no override can
resolve it. Check whether the path is dev-only (it is never shipped by `next build`) and say so
in the report rather than leaving it unexplained. Currently unfixable and dev-only:

- `image-size` (2 high) — pulled by `@storybook/nextjs`
- `elliptic` (1 low) — `@storybook/nextjs > node-polyfill-webpack-plugin > crypto-browserify`

Machine-readable listing when the table output is unwieldy:

```bash
pnpm audit --json | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const a=JSON.parse(s);for(const x of Object.values(a.advisories||{}))console.log(x.severity,x.module_name,'patched:'+x.patched_versions)})"
```

## 4. Majors, one at a time

Bump a single major, run the **whole** verification suite in step 5, and revert it if it does
not come back clean. Notes from past passes:

- **TypeScript 7** needs `tsconfig.json` edits: `target: es5` is removed (use `ES2017`),
  `baseUrl` is removed (make every `paths` entry relative — `"./src/app/components/*"`).
  Next 16 and Storybook 10 both build fine with it.

## 5. Verify — all of it

CI (`.github/workflows/ci.yml`) runs lint → i18n-check → build → e2e. Run that plus the two
checks CI omits:

```bash
pnpm lint                     # Biome; warnings are OK, exit code must be 0
pnpm i18n-check
pnpm exec tsc --noEmit        # run AFTER a build — needs the generated next-env.d.ts
pnpm build
pnpm build-storybook          # not in CI, but breaks on TS/webpack majors
pnpm test:e2e
pnpm install --frozen-lockfile   # proves the lockfile CI will use is consistent
```

`tsc --noEmit` on a clean checkout reports bogus `*.svg` / `IntrinsicAttributes` errors because
`next-env.d.ts` has not been generated yet. Build first, then typecheck.

Run `pnpm lint` **before** the e2e suite, as CI does: Biome's `files.includes` does not honour
`.gitignore`, so a leftover `test-results/.last-run.json` from a previous run makes `pnpm lint`
fail on formatting. Clean up after yourself either way:
`rm -rf storybook-static test-results playwright-report`.

### Running the e2e suite in a sandbox

The sandbox ships a pre-installed Chromium (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`) whose
build revision usually differs from the one `@playwright/test` expects, so `pnpm test:e2e` fails
with `Executable doesn't exist at .../chromium_headless_shell-<rev>`. **Do not run
`playwright install`.** Point Playwright at the bundled binary with a throwaway config:

```bash
cat > playwright.local.config.ts <<'EOF'
import base from "./playwright.config";
export default {
  ...base,
  use: {
    ...base.use,
    launchOptions: { executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" },
  },
};
EOF
CI=1 pnpm exec playwright test --config=playwright.local.config.ts --reporter=list
rm -f playwright.local.config.ts    # never commit this
```

Adjust `chromium-<rev>` to whatever `ls /opt/pw-browsers` shows. The suite is 11 tests and takes
~40s; the `webServer` block boots `pnpm dev` on port 3055 automatically.

## 6. Before committing

`next dev` (started by the Playwright `webServer`) appends a `<!-- BEGIN:nextjs-agent-rules -->`
block to `CLAUDE.md`. It is a genuine Next.js 16.3 feature
(`node_modules/next/dist/server/lib/generate-agent-files.js`), but it is unrelated to a
dependency bump — revert it unless the user wants it kept:

```bash
git checkout -- CLAUDE.md
git status --short   # expect only package.json, pnpm-lock.yaml (+ tsconfig.json on a TS major)
```

Commit convention used by previous passes: `deps: upgrade dependencies`.

## 7. Report

State plainly: packages bumped (with old → new), majors taken **and majors deliberately skipped
with the reason**, audit count before → after, which findings remain unfixable and why they are
harmless, and the result of every verification command.
