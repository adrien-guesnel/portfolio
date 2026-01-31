import { test, expect } from "@playwright/test";

test.describe("Theme Switching", () => {
	test("should toggle between light and dark themes", async ({ page }) => {
		// Navigate to the page
		await page.goto("/en");
		await page.waitForLoadState("networkidle");

		// Get the html element to check theme
		const htmlElement = page.locator("html");

		// Check initial theme (should be light by default or based on system preference)
		const initialTheme = await htmlElement.getAttribute("data-theme");
		expect(["light", "dark"]).toContain(initialTheme);

		// Find the theme toggle button
		const themeToggle = page.getByLabel("Toggle theme");
		await expect(themeToggle).toBeVisible();

		// Click to toggle theme
		await themeToggle.click();

		// Wait for theme change
		await page.waitForTimeout(500);

		// Check that theme has changed
		const newTheme = await htmlElement.getAttribute("data-theme");
		expect(newTheme).not.toBe(initialTheme);
		expect(["light", "dark"]).toContain(newTheme);

		// Toggle back
		await themeToggle.click();
		await page.waitForTimeout(500);

		// Verify theme is back to initial
		const finalTheme = await htmlElement.getAttribute("data-theme");
		expect(finalTheme).toBe(initialTheme);
	});

	test("should persist theme preference after reload", async ({ page }) => {
		// Navigate to the page
		await page.goto("/en");
		await page.waitForLoadState("networkidle");

		// Get the html element
		const htmlElement = page.locator("html");

		// Toggle to dark theme
		const themeToggle = page.getByLabel("Toggle theme");
		await themeToggle.click();
		await page.waitForTimeout(500);

		// Get the theme after toggle
		const themeBeforeReload = await htmlElement.getAttribute("data-theme");

		// Reload the page
		await page.reload();
		await page.waitForLoadState("networkidle");

		// Check that theme persisted after reload
		const themeAfterReload = await htmlElement.getAttribute("data-theme");
		expect(themeAfterReload).toBe(themeBeforeReload);
	});
});
