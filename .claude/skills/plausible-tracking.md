# Plausible Tracking

Use this skill when asked how to track a new event with Plausible on this portfolio.

## Setup

- Script loaded in `src/app/[locale]/layout.tsx` via Next.js `<Script>` with `data-domain` set dynamically from the request `host` header (works in prod, staging, and dev)
- Script source: `https://analytics.aguesnel.fr/js/script.hash.outbound-links.pageview-props.tagged-events.js`
- Event types and props are centrally typed in `src/app/lib/plausible.ts`

## Adding a new event

1. Add the event name and its props type to the `PlausibleEvents` map in `src/app/lib/plausible.ts`
2. Call the hook in the component and fire the event

```ts
// src/app/lib/plausible.ts
type PlausibleEvents = {
  // events with no props
  "My New Event": never;
  // events with props
  "My Event With Props": { key: string };
};
```

```tsx
import { usePlausibleEvents } from "@/src/app/lib/plausible";

export default function MyComponent() {
  const plausible = usePlausibleEvents();

  // Simple event
  plausible("My New Event");

  // With props
  plausible("My Event With Props", { props: { key: "value" } });

  // With callback (use when navigation happens immediately after — prevents XHR cancellation)
  plausible("Language Switched", {
    props: { lang: "en" },
    callback: () => router.replace(pathname, { locale: "en" }),
  });
}
```

## Existing events

| Event | Props | Where |
|---|---|---|
| `Language Switched` | `{ lang: string }` | NavigationBar |
| `Theme Toggled` | `{ theme: string }` | NavigationBar |
| `Book Discovery Call Clicked` | `{ source: string }` | NavigationBar, Hero |
| `Contact Form Submitted` | — | Contact form |
| `Project Card Clicked` | `{ project: string; link: string }` | ProjectCard |
| `Outbound: LinkedIn` | — | Footer |
| `Outbound: Malt` | — | Footer |
| `Outbound: GitHub` | — | Footer |

## Notes

- `usePlausibleEvents()` returns `usePlausible<PlausibleEvents>()` from `next-plausible` — TypeScript enforces valid event names and props at compile time
- When Plausible isn't loaded (adblocker, dev), `window.plausible` is still queued by the inline init script so events are buffered harmlessly
- Use `callback` when the event fires just before a page navigation to avoid the XHR being cancelled mid-flight
- Props values must be strings
