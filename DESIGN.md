# Design

Design reference for the Tech Lead redesign of the portfolio (aguesnel.fr). It carries the content of the design artifact so the repository holds the source of truth. The site follows it; when the two disagree, update this file first.

## Private artifact

The artifact is private: only its owner can open it. Do not share it or publish its URL elsewhere. It holds the interactive canvas; this file holds its content. An agent running in the owner's sessions can open it with the Artifact tool (`read` action) to check a detail this file leaves out.

| Artifact | Content | URL |
|---|---|---|
| Design canvas "Portfolio Tech Lead" | Four columns: the 10 sections in the light theme, the same sections in the dark theme, the full light page, the full dark page. Sections: navigation, hero and references, approach, case studies, experience, expertise, testimonials, articles, contact, footer. Shared tokens in `project/site.css` | https://claude.ai/artifact/A1UWVcta3Xu3CZs5aLvKrY |

## Identity

The site sells one profile: **Tech Lead freelance, TypeScript**. Everything on the page supports that claim with a fact from a real mission, and nothing contradicts it. The look is an engineering log: a quiet ground, one blue accent, monospace labels for metadata (`01 / Approche`, dates, roles), and a portrait that reads professional and approachable (blazer, open collar, no tie, arms crossed, smiling).

There is no logo besides the `AG` monogram: a 40px rounded square in `ink` with the initials in `on-ink`, followed by the name and the `tech lead · freelance` line.

## Content fundamentals

The site is bilingual (`fr` default, `en`). Copy lives in `messages/{fr,en}`; the examples below are the French strings.

- Facts over adjectives. Every claim points to a mission: « Migration de MongoDB Atlas vers PostgreSQL proposée au client, arbitrée et réalisée. » No superlatives, no self-praise.
- One title per mission, the same as the Tech Lead CV in `cv-maker`: Loopaero « Tech Lead », TellDem « Lead développeur backend », Bloom Care « Pilotage de la mise en conformité Ségur ». Never a title the mission does not support.
- Say only what was delivered: Bloom Care is « Préparation de l'intégration de Pro Santé Connect, MSSanté et INSi », not « intégration ».
- Key figures in the hero are only « 10+ ans » and « 2+ ans de responsabilité technique d'un SaaS construit de zéro ». Other figures (9 mois, -70 %, 2 semaines) stay inside their case study or proof.
- Never display the email address. Contact goes through the form and the cal.com link.
- No CV download.
- Every « Réserver un appel » points to `BOOKING_DISCOVERY_CALL_URL` (cal.com).
- Parcours lines stay short: period, role or mission, company, at most one fact.
- Never use the em dash character in copy. Use `·` as a separator in metadata lines and `→` for date ranges (with a screen-reader text « à » / « to »).

## Visual foundations

### Color

The theme is chosen by `src/app/lib/theme.ts`: stored choice, else the system preference, applied to `<html data-theme>` and to the `theme-color` meta before hydration. DaisyUI's built-in themes are disabled; without JavaScript the page falls back to the light theme as a whole.

Tokens are CSS variables set on `[data-theme="light"]` and `[data-theme="dark"]` in `src/app/globals.css`, and exposed to Tailwind as `bg-*`, `text-*`, `border-*` utilities. DaisyUI semantic tokens (`base-100`, `base-200`, `base-300`, `base-content`, `primary`, `neutral`) are mapped onto the same values. Never write a raw hex in a component.

| Token | Light | Dark | Use |
|---|---|---|---|
| `bg` (`base-100`) | `#FFFFFF` | `#0B0F17` | Page ground |
| `band` (`base-200`) | `#F6F7F9` | `#121A28` | Alternating sections (approach, experience, testimonials) and the contact block |
| `surface` | `#FFFFFF` | `#161F2E` | Cards, panels, form card, chips |
| `media` | `#EEF0F4` | `#1A2230` | Behind images |
| `line` (`base-300`) | `#E3E5EA` | `#263042` | Card borders |
| `line-soft` | `#ECEEF1` | `#1D2533` | Section dividers, row separators |
| `line-strong` | `#D5D8DE` | `#334055` | Ghost button border, dashed proof divider |
| `field` | `#858B97` | `#64738B` | Form field borders (≥3:1, WCAG 1.4.11) |
| `fg` (`base-content`) | `#0F1420` | `#E8ECF3` | Headings, primary text |
| `fg-2` | `#3A4150` | `#C2C9D6` | Body copy |
| `muted` | `#545B69` | `#9AA4B5` | Metadata, labels, kickers |
| `faint` | `#6B7280` | `#8B95A7` | Client names, placeholders |
| `chip-fg` | `#2B3240` | `#D3D9E3` | Chip text |
| `primary` | `#2348C7` | `#3B5BDB` | Filled buttons (with `primary-content` `#FFFFFF`) |
| `link` | `#2348C7` | `#8DA6FF` | Accent text: links, highlighted words, icons, focus ring |
| `link-soft` | `rgba(35,72,199,.08)` | `rgba(141,166,255,.12)` | Icon tiles, avatar initials |
| `neutral` (ink) | `#0F1420` | `#E8ECF3` | Monogram, active language, secondary filled button (with `neutral-content`) |
| `ok-bg` / `ok-fg` / `ok-dot` | `#ECF8F0` / `#14532D` / `#16A34A` | `rgba(34,197,94,.14)` / `#86EFAC` / `#22C55E` | Availability badge |
| `error-fg` | `#B42318` | `#FDA29B` | Field error messages |

Measured contrast (WCAG 2.2 AA, checked by the accessibility reviewer): `fg` 18.4 / 14.0, `fg-2` 10.2 / 9.9, `muted` 6.4 to 6.8 / 6.6 to 7.6, `faint` 4.8 / 5.5, `link` 6.9 to 7.4 / 7.1 to 8.3, buttons 7.4 / 5.7, field borders 3.4 / 3.4 to 4.0. Any new pair must reach 4.5:1 for text and 3:1 for UI.

The dark theme is a palette of its own, not an inversion: `link` is lighter than `primary` so accent text stays readable, and surfaces step up from `bg` to `band` to `surface`.

### Typography

- `Geist` for text, `Geist Mono` for metadata (kickers, dates, chips, labels of the hero card, footer), loaded with `next/font/google`.
- Hero `h1`: `clamp(34px, 5.2vw, 70px)`, weight 600, line-height 1.05, letter-spacing -0.035em.
- Section `h2`: `clamp(30px, 4.4vw, 48px)`, weight 600, line-height 1.1, letter-spacing -0.03em.
- Card titles 20 to 21px weight 600; case study title `clamp(23px, 2.6vw, 34px)`.
- Body 16px, line-height 1.55; hero lead `clamp(17px, 1.6vw, 19px)`; secondary copy 14.5 to 15px.
- Kicker: Geist Mono 13px, letter-spacing 0.04em, `muted`, format `NN / Nom` (`01 / Approche`).
- Form fields use 16px so iOS never zooms on focus.

### Layout and spacing

- Container: `max-width: 1200px`, horizontal padding `clamp(16px, 4vw, 24px)`.
- Section padding: `clamp(56px, 9vw, 96px)` top and bottom. Section head bottom margin `clamp(32px, 5vw, 48px)`.
- Grid gap 16px between cards; 24 to 32px between columns.
- Breakpoints: ≤1080px (tablet: burger menu, hero stacks with the photo under the text at max 440px wide, 4 and 3 column grids become 2, the last odd card spans the row, case study image above text, experience aside under the timeline, contact stacked); ≤640px (phone: language switch and nav CTA move into the menu, buttons full width, every grid one column, row labels above content); ≤380px (the `tech lead · freelance` line is hidden).
- No horizontal scroll at 320px wide.

### Shape, borders and elevation

- Radii: 8px (small badges), 10px (nav controls, fields), 12px (buttons), 18px (cards), 20px (panels, mini cards), 24px (case study, hero photo), 28px (contact block), 999px (chips, pills, avatars).
- Borders 1px `line`; dividers `line-soft`; the « proof » line of approach cards is dashed `line-strong`.
- Shadows only on floating elements: the hero card under the photo (`0 12px 32px` at 12% light, 45% dark) and the mobile menu panel.

### States

- Focus: `outline: 2px solid link; outline-offset: 3px` on every interactive element (`:focus-visible`). Fields also switch their border to `link`.
- Hover: nav links and icon buttons get a `band`-like hover fill (`#F3F4F6` / `#1A2230`); links switch to `link`.
- Hover transitions: colors 200ms; the arrow of a button nudges 2px right; article cards lift 2px and their `↗` moves up and right.

### Motion

Light and short, only on first display. All of it sits behind `prefers-reduced-motion: no-preference` (and `screen`, so print shows everything); with reduced motion the page is static.

- Easing `--ease-out-soft` (`cubic-bezier(0.22, 1, 0.36, 1)`).
- Hero on load: `rise-children` fades the text column in from 14px below, one child every 70ms; the portrait frame rises at 120ms while the photo settles from a 1.03 scale (`settle-in`); the role card rises at 420ms and the clients line at 480ms.
- Availability dot: a green halo pulses 3 times (under 5s, WCAG 2.2.2), then stops.
- Sections on scroll: elements marked `data-reveal` (kicker, `h2`, heading aside, cards, panels, expertise rows) fade in from 18px below over 700ms, 80ms apart within a batch (capped at 400ms). The section wires them with `useReveal()` (`src/app/lib/useReveal.ts`). Only elements still below the fold after hydration are hidden, so the server HTML, a visit without JavaScript and a section already on screen render visible.
- Anchor links scroll smoothly.
- Never animate layout properties, never loop, never delay content by more than ~0.5s.

### Imagery

- Hero portrait: `public/img/portrait-light.webp` (light gray background) in the light theme, `public/img/portrait-dark.webp` (slate background) in the dark theme. Frame ratio 4:4.7, `object-position: 50% 15%`. The contact avatar reuses the same pair, cropped round at 56px.
- Case study visuals: Loopaero (product screenshot; it still reads as a light block on the dark theme, a dark variant is wanted), Bloom Care (coral logo on `surface`), Linkup (black logo on beige, **inverted in the dark theme** with `invert(1) hue-rotate(180deg)` so it becomes a white logo on a near-black ground), TellDem (phones on black).
- Target format for future visuals: 1600×1000, plain background, product UI centered, no marketing text.

### Iconography

`iconoir-react`, stroke icons only, `aria-hidden` when decorative. Arrows in link labels (`↗`, `→`) are wrapped in `aria-hidden` spans.

## Accessibility

WCAG 2.2 AA in both themes is a release criterion. Run the project agent `.claude/agents/accessibility-reviewer.md` after any change to colors, themes, layout or components. Rules the design depends on:

- Skip link « Aller au contenu principal » to `main#main-content` (`tabIndex={-1}`); header and footer outside `main`.
- One `h1`; sections use `h2`; no skipped levels.
- Theme toggle is a `<button aria-pressed>` with a stable label (« Thème sombre »). The language switch is a labelled list (« Langue ») of buttons carrying `lang` and `aria-pressed`; their focus ring is drawn inside the button so it never lands on the pressed neighbour.
- External links (`target="_blank"`) carry a screen-reader hint « (nouvel onglet) » (`NewTabHint`).
- The mobile `<details>` menu closes on link click, on Escape (focus back to the burger) and when focus leaves it.
- After a successful send, focus moves to the `role="status"` result, since the form leaves the DOM. reCAPTCHA follows the theme and locale, and switches to `compact` below 400px.
- Lists (chips, clients, timeline, social links) are real `ul`/`ol`.
- Form: visible labels, « (facultatif) » on optional fields, `autocomplete`, `required`, an error `p` per field linked with `aria-describedby` (`aria-invalid` when shown), and a `role="status"` live region for the result.
- Touch targets ≥44px on primary controls.
- Never disable zoom (`userScalable` stays allowed).

## Page structure

| # | Section | Id | Background | Content |
|---|---|---|---|---|
| 0 | Navigation | | `bg` | Monogram and name, links (Approche, Réalisations, Parcours, Expertises, Contact), FR/EN, theme toggle, « Réserver un appel » |
| 1 | Hero and references | `top` | `bg` | Availability badge, h1, lead, two CTAs, two key figures, social links, portrait with the role card; « Ils m'ont fait confiance » list |
| 2 | Approche | `approach` | `band` | 4 cards: Architecture & choix techniques, Cadrage & priorisation, Équipe & coordination, Qualité & mise en production, each with a proof from a mission |
| 3 | Études de cas | `case-studies` | `bg` | Loopaero featured (two phases), then Bloom Care, Linkup, TellDem. Metadata format: Entreprise · Secteur · Période |
| 4 | Parcours | `experience` | `band` | Freelance block 2023 → 2026 with its four missions, then employments; aside: education, domains, languages |
| 5 | Expertises | `expertise` | `bg` | « Méthodes et technologies »: Leadership technique, Architecture, Backend & données, Frontend & back-offices, Sécurité & identité, Livraison, Qualité, IA. Neutral chips ordered by importance, no highlighting |
| 6 | Témoignages | `testimonials` | `band` | Laurent G. (Bloom Care), Vincent B. (Chance), Antoine K. (Jedha) |
| 7 | Articles | `articles` | `bg` | 3 Medium articles with direct links |
| 8 | Contact | `contact` | `band` block | Avatar, title, base and timezone, cal.com button; form card |
| 9 | Footer | | `bg` | Copyright, social links |

## Components

Atomic design under `src/app/components/` (`@components/*`).

| Component | Level | Notes |
|---|---|---|
| `Button` / `buttonClass()` | atom | Variants `primary` (accent), `neutral` (ink), `ghost` (outlined); sizes `md` (52px) and `sm` (44px). Links styled as buttons use `buttonClass()` |
| `Chip` / `ChipList` | atom | Mono 12.5px pill, `surface` with `line` border, `chip-fg`. Rendered as `li` inside a `ul` |
| `Period` | atom | Renders `2023 → 2025` with the arrow hidden from screen readers and « à » / « to » read instead |
| `NewTabHint` | atom | Screen-reader only « (nouvel onglet) » / « (new tab) » inside external links |
| `ThemeImage` | atom | Two lazy `next/image`, one per theme, hidden with `theme-only-light` / `theme-only-dark` |
| `Field` | atom | Shared label, « (facultatif) », error `p` linked by `aria-describedby` and `aria-invalid`; renders its control through a render prop |
| `Input` / `Textarea` | atoms | Thin wrappers around `Field` with the shared `fieldClass` |
| `Portrait` | atom | `ThemeImage` preset with the light and dark portraits, used by the hero and the contact avatar |
| `SectionHeading` | molecule | Kicker (`NN / Nom`) plus `h2`, optional side text or link |
| `TestimonialCard` | molecule | Quote icon, quote, initials avatar, name, role and company |
| `MediumArticleCard` | molecule | Whole card is the link to the article |
| `NavigationBar` | organism | Desktop links ≥1081px, native `<details>` burger menu below, closed on link click; language buttons with `aria-pressed`; theme toggle |
| `Hero`, `Approach`, `CaseStudies`, `Experience`, `Expertise`, `Testimonials`, `Articles`, `Contact`, `Footer` | organisms | One per section above; the approach cards, case studies and timeline rows are rendered inside them from `messages/*/pages.json` |

## Do and don't

- Do back every claim with a mission. Don't add a figure or title the CV does not support.
- Do keep the accent for actions and highlights. Don't color chips or whole rows.
- Do test both themes and 320px. Don't ship a white image block on the dark theme.
- Don't show the email, a CV download, or a « Tech Lead » badge on a single card.
