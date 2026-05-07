# Plausible Tracking

Use this skill when asked how to track a new event with Plausible on this portfolio.

## Pattern

All tracking goes through `src/app/lib/plausible.ts`. No external package — calls `window.plausible?.()` directly (already injected by the Plausible script in the HTML).

## Adding a new event

1. Add the event name to the `PlausibleEventName` union in `src/app/lib/plausible.ts`
2. Call `trackEvent()` in the component

```ts
import { trackEvent } from "@/src/app/lib/plausible";

// Simple event
trackEvent("Contact Form Submitted");

// With props
trackEvent("Project Card Clicked", { project: "my-project" });

// Outbound link shorthand
import { trackOutbound } from "@/src/app/lib/plausible";
trackOutbound("LinkedIn");
```

## Existing events

| Event | Props | Where |
|---|---|---|
| `Language Switched` | `{ lang: "en" \| "fr" }` | NavigationBar |
| `Contact Form Submitted` | — | Contact form |
| `Outbound: LinkedIn` | — | Footer / CTA |
| `Outbound: Malt` | — | Footer / CTA |
| `Outbound: GitHub` | — | Footer / CTA |
| `Project Card Clicked` | `{ project: string }` | ProjectCard |
| `Theme Toggled` | — | NavigationBar |
| `Book Discovery Call Clicked` | — | NavigationBar / CTA |

## Notes

- `window.plausible?.()` — optional chaining handles when Plausible isn't loaded (dev, adblocker)
- `interactive: false` is only needed for non-click events (e.g. programmatic navigation)
- Props values must be strings
