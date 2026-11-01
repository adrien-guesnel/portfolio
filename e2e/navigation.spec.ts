import { expect, test } from "./fixtures";

const SECTIONS = [
  { name: "Approach", hash: "#approach" },
  { name: "Work", hash: "#case-studies" },
  { name: "Experience", hash: "#experience" },
  { name: "Expertise", hash: "#expertise" },
  { name: "Contact", hash: "#contact" },
];

test.describe("Navigation Menu", () => {
  test("should have working menu links", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    const nav = page.getByRole("navigation", { name: "Main navigation" });
    for (const section of SECTIONS) {
      const link = nav.getByRole("link", { name: section.name });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", section.hash);
    }
  });

  test("should navigate to sections when clicking menu links", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    const nav = page.getByRole("navigation", { name: "Main navigation" });
    for (const section of SECTIONS) {
      await nav.getByRole("link", { name: section.name }).click();
      await page.waitForURL(new RegExp(`/en${section.hash}$`));
    }
  });

  test("should open the mobile menu and reach a section", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    await page.locator('summary[aria-label="Menu"]').click();
    await page.getByRole("link", { name: "Experience" }).click();
    await page.waitForURL(/\/en#experience$/);
  });

  test("should have working homepage logo link", async ({ page }) => {
    await page.goto("/en#expertise");
    await page.waitForLoadState("networkidle");

    const logoLink = page.getByRole("link", { name: "Adrien Guesnel, home" });
    await expect(logoLink).toBeVisible();
    await logoLink.click();

    await page.waitForURL(/\/en\/?$/);
    expect(page.url()).toMatch(/\/en\/?$/);
  });

  test("should move focus to the main content from the skip link", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main#main-content")).toBeFocused();
  });
});
