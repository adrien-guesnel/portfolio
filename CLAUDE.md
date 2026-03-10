# CLAUDE.md — Portfolio Project

## Package manager

Always use **pnpm** (>= 10). Never use npm or yarn.

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
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **i18n**: next-intl (default locale: `fr`, also `en`)
- **Linter/Formatter**: Biome (replaces ESLint + Prettier)
- **Icons**: iconoir-react
- **Animations**: lottie-react
- **Email**: node-mailjet
- **Notifications**: sonner
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
│   │   ├── atoms/             # Base primitives (GlassCard, Card, SkillBadge)
│   │   ├── molecules/         # Compositions (ProjectCard, TestimonialCard…)
│   │   └── organisms/         # Page sections (Hero, Contact, Footer…)
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

## Styling conventions

- Use **DaisyUI semantic tokens** for colors (`base-100`, `primary`, `secondary`, etc.), not raw Tailwind colors.
- Glassmorphism pattern: `backdrop-blur-xl bg-base-100/60 border border-base-200/70`
- Hover animations: `hover:-translate-y-1 transition-transform duration-300`
- Dark/light theme is driven by `data-theme` attribute on `<html>` (DaisyUI).
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

## Deployment

- Docker multi-stage build, output: `standalone`
- Exposes port 3000 in production
- CI (GitHub Actions) runs on all PRs: lint → i18n-check → build
