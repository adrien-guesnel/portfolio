import { expect, test } from "./fixtures";

test.describe("Language Switching", () => {
  test("should switch between English and French", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/en/);

    const languages = page.getByRole("list", { name: "Language" });
    const frButton = languages.getByRole("button", { name: "FR" });
    await expect(frButton).toBeVisible();
    await expect(languages.getByRole("button", { name: "EN" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await frButton.click();

    await page.waitForURL(/\/fr/);
    await expect(page).toHaveURL(/\/fr/);

    const enButton = page.getByRole("list", { name: "Langue" }).getByRole("button", { name: "EN" });
    await expect(enButton).toBeVisible();
    await enButton.click();

    await page.waitForURL(/\/en/);
    await expect(page).toHaveURL(/\/en/);
  });

  test("should preserve language after page reload", async ({ page }) => {
    await page.goto("/fr");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/fr/);

    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/fr/);
  });
});
