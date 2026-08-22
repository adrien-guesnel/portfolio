import { test as base } from "@playwright/test";

/**
 * Analytics (Plausible) is loaded from an external domain that is unreachable in CI and
 * blocked by most ad blockers. Some interactions — the language switcher, for instance —
 * run their side effect in the Plausible `callback`, which never fires when the real
 * script is missing. Stubbing it keeps the tests deterministic and offline-friendly.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      const stub = (_event: string, options?: { callback?: () => void }) => {
        options?.callback?.();
      };
      (window as unknown as { plausible: typeof stub }).plausible = stub;
    });
    await use(page);
  },
});

export { expect } from "@playwright/test";
