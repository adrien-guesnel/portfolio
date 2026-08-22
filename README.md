# Portfolio

Personal portfolio site built with Next.js, Tailwind, and Storybook to showcase my freelance React/Node.js developer activity.

## Overview

The site is a localized (English + French) Next.js application with a lightweight design system, animated interactions, and a modular component library that powers the hero, project cards, testimonials, and contact flows. It also exposes each component story in Storybook so interactions can be previewed alongside the Next.js pages.

## Features

- Light / dark theming powered by DaisyUI tokens and global gradients/backgrounds.
- Storybook stories for atoms, molecules, and organisms so each UI building block can be inspected in isolation.
- Contact form with Mailjet + reCAPTCHA protection.
- Internationalized content served via `next-intl` with message files for English and French under `messages/*`.
- Accessibility-minded buttons, gradients, and glassmorphism treatments across cards, hero, and call-to-action sections.

## Tech Stack

- Next.js 16 (App Router) & React 19
- Tailwind CSS 4 + DaisyUI for theming helpers
- Storybook 10 for component demos
- `next-intl` for localization
- Mailjet + `react-google-recaptcha` for inbound form handling
- Biome for linting + formatting
- Sonner for toast notifications

## Getting Started

### Prerequisites

- Node >= 24 (matches the `.nvmrc`/workflow tooling)
- `pnpm` >= 10 (required by the `engines` field)

### Install dependencies

```bash
pnpm install
```

### Local development

```bash
pnpm dev
```

Runs the Next.js app locally on port 3055. Open http://localhost:3055 in your browser after the server starts.

### Storybook

```bash
pnpm storybook
```

Starts Storybook on port 6007 so atoms, molecules, and organisms can be reviewed independently of the shell app.

### Production build

```bash
pnpm build
pnpm start
```

Builds the optimized production bundle and starts the Next.js server.

## Quality Gates

- `pnpm lint`: runs Biome to catch formatting and static analysis issues.
- `pnpm lint:fix`: lets Biome rewrite formatting and import order automatically.
- `pnpm i18n-check`: validates the localized message files used by `next-intl`.
- `pnpm test:e2e`: runs end-to-end tests with Playwright to ensure core functionality remains intact.

## E2E Testing

The project uses Playwright for end-to-end testing to ensure the portfolio maintains baseline functionality, especially after package updates.

### Test Coverage

The E2E tests cover the following critical functionalities:

- **Language Switching**: Verify switching between English and French works correctly
- **Theme Toggle**: Test light/dark mode switching and persistence
- **Contact Form**: Validate form submission and error handling
- **Navigation**: Ensure menu links navigate to correct sections

### Running E2E Tests

```bash
# Run all E2E tests (headless mode)
pnpm test:e2e

# Run tests with UI mode for debugging
pnpm test:e2e:ui

# View test report after running tests
pnpm test:e2e:report
```

### Running Tests in CI

E2E tests automatically run in the CI pipeline after the build step. Test artifacts and reports are uploaded for review if tests fail.

### Requirements

- Playwright browsers are automatically installed when running tests locally for the first time
- Tests run against `http://localhost:3055` (the dev server is automatically started)
- Environment variables from `.env` are used for API keys (test keys are provided as fallbacks)

## Key Directories

- `src/app`: Next.js App Router entries, global CSS, and manifest/SEO helpers.
- `src/app/components`: atomic/molecular/organism UI primitives (GlassCard, Hero, Contact, etc.).
- `src/app/lib`: shared constants, routes, and the custom `NextIntlProvider`.
- `messages`: English (`en/`) and French (`fr/`) JSON blobs that power navigation, projects, testimonials, and testimonials.
- `public`: static assets, including flags and site imagery used by cards.

## Localization & Theming

The app loads translations via `next-intl` using the `messages/*` files. The `ThemeSwitcher` toolbar in Storybook and the global CSS gradients (grid for light mode, glow accents for buttons) keep both themes synchronized.

## Contributing & Notes

- Follow the component patterns under `src/app/components/*` when adding new cards or sections.
- Storybook stories live next to each component to make visual regression easy.
- If you touch localization keys, run `pnpm i18n-check` before committing.
- Husky hooks (via `pnpm prepare`) ensure Biome runs on staged files.

## License

MIT © Adrien Guesnel
