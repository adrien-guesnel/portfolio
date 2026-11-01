import { expect, test } from "./fixtures";

test.describe("Theme Switching", () => {
  test("should toggle between light and dark themes", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    const htmlElement = page.locator("html");
    const initialTheme = await htmlElement.getAttribute("data-theme");
    expect(["light", "dark"]).toContain(initialTheme);

    const themeToggle = page.getByRole("button", { name: "Dark theme" });
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toHaveAttribute(
      "aria-pressed",
      initialTheme === "dark" ? "true" : "false",
    );

    await themeToggle.click();
    await expect(htmlElement).not.toHaveAttribute("data-theme", initialTheme ?? "");
    const newTheme = await htmlElement.getAttribute("data-theme");
    expect(["light", "dark"]).toContain(newTheme);
    await expect(themeToggle).toHaveAttribute(
      "aria-pressed",
      newTheme === "dark" ? "true" : "false",
    );

    await themeToggle.click();
    await expect(htmlElement).toHaveAttribute("data-theme", initialTheme ?? "");
  });

  test("should persist theme preference after reload", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    const htmlElement = page.locator("html");
    await page.getByRole("button", { name: "Dark theme" }).click();
    const themeBeforeReload = await htmlElement.getAttribute("data-theme");

    await page.reload();
    await page.waitForLoadState("networkidle");

    await expect(htmlElement).toHaveAttribute("data-theme", themeBeforeReload ?? "");
  });

  test("should show the portrait matching the theme", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    const portraits = page.getByAltText(/^Portrait of Adrien Guesnel/);
    await expect(portraits.nth(0)).toBeVisible();
    await expect(portraits.nth(1)).toBeHidden();

    await page.getByRole("button", { name: "Dark theme" }).click();
    await expect(portraits.nth(0)).toBeHidden();
    await expect(portraits.nth(1)).toBeVisible();
  });

  test("should keep the theme-color meta in sync with the chosen theme", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: "Dark theme" }).click();
    const metas = page.locator('meta[name="theme-color"]');
    for (const meta of await metas.all()) {
      await expect(meta).toHaveAttribute("content", "#0B0F17");
    }
  });
});

test.describe("Theme without JavaScript", () => {
  test.use({ javaScriptEnabled: false, colorScheme: "dark" });

  test("should render a consistent light theme on a dark system", async ({ page }) => {
    await page.goto("/en");

    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(page.getByText(/^Tech Lead with 10\+ years/)).toHaveCSS(
      "color",
      "rgb(58, 65, 80)",
    );
  });
});
