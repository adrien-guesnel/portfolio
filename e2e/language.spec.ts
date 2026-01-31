import { test, expect } from "@playwright/test";

test.describe("Language Switching", () => {
	test("should switch between English and French", async ({ page }) => {
		// Start on English page
		await page.goto("/en");

		// Wait for page to load
		await page.waitForLoadState("networkidle");

		// Verify we're on English page by checking URL
		await expect(page).toHaveURL(/\/en/);

		// Find and click French language button - use more specific selector
		const frButton = page.locator('.join button:has-text("FR")');
		await expect(frButton).toBeVisible();
		await frButton.click();

		// Wait for navigation to French page
		await page.waitForURL(/\/fr/);

		// Verify we're on French page
		await expect(page).toHaveURL(/\/fr/);

		// Switch back to English
		const enButton = page.locator('.join button:has-text("EN")');
		await expect(enButton).toBeVisible();
		await enButton.click();

		// Wait for navigation back to English page
		await page.waitForURL(/\/en/);

		// Verify we're back on English page
		await expect(page).toHaveURL(/\/en/);
	});

	test("should preserve language after page reload", async ({ page }) => {
		// Navigate to French page
		await page.goto("/fr");
		await page.waitForLoadState("networkidle");

		// Verify we're on French page
		await expect(page).toHaveURL(/\/fr/);

		// Reload the page
		await page.reload();
		await page.waitForLoadState("networkidle");

		// Verify we're still on French page after reload
		await expect(page).toHaveURL(/\/fr/);
	});
});
