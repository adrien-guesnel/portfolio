# CLAUDE.md — Portfolio Project

## Package manager

Always use **pnpm** (>= 12). Never use npm or yarn. pnpm settings (overrides, `allowBuilds`,
`saveExact`, `minimumReleaseAge`) live in `pnpm-workspace.yaml`: pnpm >= 11 ignores the `pnpm`
field of `package.json` and every non-auth setting in `.npmrc`.

```bash
pnpm install
pnpm dev          # dev server on port 3055
pnpm build
pnpm lint         # Biome check
pnpm lint:fix     # auto-fix linting
pnpm check:write  # auto-fix formatting
pnpm storybook    # Storybook on port 6007
pnpm i18n-check   # validate i18n message keys
```

## Tech stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 7 (strict mode)
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **i18n**: next-intl (default locale: `fr`, also `en`)
- **Linter/Formatter**: Biome (replaces ESLint + Prettier)
- **Icons**: iconoir-react
- **Email**: node-mailjet
- **Visual testing**: Storybook

## Project structure

```
src/
├── app/
│   ├── [locale]/              # Localized routes
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Metadata only
│   │   └── home.tsx           # Page content
│   ├── api/
│   │   └── send-mail/route.ts # Contact form endpoint (Mailjet)
│   ├── components/
│   │   ├── atoms/             # Base primitives (Chip, Period, ThemeImage)
│   │   ├── molecules/         # Compositions (SectionHeading, TestimonialCard…)
│   │   └── organisms/         # Page sections (Hero, CaseStudies, Contact…)
│   └── lib/
│       ├── Routes.ts          # Section routing constants
│       └── constants.ts       # External URLs (Malt, LinkedIn…)
├── i18n/
│   ├── routing.ts             # next-intl routing config
│   └── request.ts             # Message loader
messages/
├── en/
│   ├── components.json
│   └── pages.json
└── fr/
    ├── components.json
    └── pages.json
```

## Component conventions

Components follow **atomic design**:
- `atoms/` — smallest reusable primitives
- `molecules/` — combinations of atoms
- `organisms/` — complex, page-level sections

Each component lives in its own directory with:
- `index.tsx` — component implementation
- `ComponentName.stories.tsx` — Storybook story (optional but encouraged)

Path alias: `@components/*` maps to `src/app/components/*`.

## Design

`DESIGN.md` is the design reference (tokens, typography, layout, components, content rules), kept
in sync with the private design artifact it links to. Read it before any visual change, and update
it in the same change when the design moves.

## Styling conventions

- Colors come from the theme tokens in `globals.css` only: DaisyUI semantic tokens (`base-100`,
  `base-200`, `base-content`, `primary`, `neutral`) and the custom ones exposed to Tailwind
  (`surface`, `line`, `line-soft`, `fg-2`, `muted`, `faint`, `link`, `link-soft`…). Never a raw hex
  or a raw Tailwind palette color in a component.
- Every token has a light and a dark value; a new pair must reach WCAG AA contrast in both themes.
- Dark/light theme is driven by the `data-theme` attribute on `<html>`; use the `dark:` variant or
  the `theme-only-light` / `theme-only-dark` utilities for theme-specific images.
- Layout helpers: `page-wrap` (1200px container), `section-y` (section padding), `h2-section`,
  `kicker`. Breakpoints: `sm` (640px), `desk` (1081px), `xs` (381px).
- Buttons and button-looking links use `buttonClass()` from `@/src/app/components/Button`.
- Run the `accessibility-reviewer` agent (`.claude/agents/`) after any visual or component change.
- Line width: **100 characters max**.
- Indent: **2 spaces**.

## i18n rules

- All user-facing strings must live in `messages/en/` and `messages/fr/`.
- Page-level strings → `pages.json`, component-level strings → `components.json`.
- Run `pnpm i18n-check` to validate keys are in sync across locales.
- Never hardcode display text in components.

## Linting & formatting

The project uses **Biome** (not ESLint/Prettier). Key rules:
- Unused imports/variables → error
- Unused else → warn
- a11y, complexity, performance, security recommended rules enabled
- Import groups: Biome/Node > packages > aliases (`@components`, `@/*`) > relative paths

Biome runs automatically on commit via Husky pre-commit hook.

## Adding a new component

1. Create `src/app/components/{atoms|molecules|organisms}/ComponentName/index.tsx`
2. Add translations to `messages/en/components.json` and `messages/fr/components.json`
3. Use `useTranslations()` from `next-intl` to access strings
4. Optionally add a `ComponentName.stories.tsx` for Storybook

## Environment variables

Required in `.env.local`:

```
MJ_APIKEY_PRIVATE=
MJ_APIKEY_PUBLIC=
CONTACT_EMAIL=
GOOGLE_RECAPTCHA_SECRET=
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE=
```

`NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE` is inlined into the client bundle by `next build`, so in
Docker it is a build arg (passed from the GitHub Actions variable of the same name), not a
runtime env var. Without it the widget never renders and `/api/send-mail` answers 400
`recaptcha_missing`. The route logs every failure as a JSON line with `scope: "send-mail"`,
readable with `kubectl logs`.

The footer shows the build version from the `APP_VERSION`, `BUILD_DATE` and `GIT_SHA` Docker
build args (set by the release and staging workflows), inlined by `next.config.mjs`. A semver
`APP_VERSION` renders as `v1.4.0`; anything else (`staging`, or `dev` when unset) renders the
channel, the UTC build date and the short commit SHA.

## Deployment

- Docker multi-stage build, output: `standalone`
- Exposes port 3000 in production
- CI (GitHub Actions) runs on all PRs: lint → i18n-check → build

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
