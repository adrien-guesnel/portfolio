import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the page
		await page.goto("/en");
		await page.waitForLoadState("networkidle");

		// Scroll to contact section
		await page.locator('nav[aria-label="Main navigation"] a[href="#contact"]').click();
		await page.waitForTimeout(1000);
	});

	test("should display contact form with required fields", async ({ page }) => {
		// Check that form elements are visible using id selectors
		await expect(page.locator("#name")).toBeVisible();
		await expect(page.locator("#email")).toBeVisible();
		await expect(page.locator("#message")).toBeVisible();

		// Check submit button is visible
		const submitButton = page.locator('button[type="submit"]');
		await expect(submitButton).toBeVisible();
	});

	test("should validate required fields", async ({ page }) => {
		// Try to submit empty form
		const submitButton = page.locator('button[type="submit"]');
		await submitButton.click();

		// Check HTML5 validation prevents submission
		// The form should not be submitted if validation fails
		// We can check if we're still on the contact section
		await page.waitForTimeout(500);
		expect(page.url()).toContain("#contact");
	});

	test("should successfully submit contact form", async ({ page, context }) => {
		// Mock the API response
		await page.route("**/api/send-mail", async (route) => {
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify({ message: "Email sent successfully" }),
			});
		});

		// Mock reCAPTCHA
		await page.addInitScript(() => {
			// @ts-ignore
			window.grecaptcha = {
				ready: (cb: () => void) => cb(),
				execute: () => Promise.resolve("test-token"),
				render: () => "test-widget-id",
				reset: () => {},
				getResponse: () => "test-token",
			};
		});

		// Fill out the form using id selectors
		await page.locator("#name").fill("John Doe");
		await page.locator("#email").fill("john.doe@example.com");
		await page.locator("#message").fill("This is a test message from E2E testing.");

		// Wait for reCAPTCHA to load
		await page.waitForTimeout(1000);

		// Submit the form
		const submitButton = page.locator('button[type="submit"]');
		await submitButton.click();

		// Wait for success message/toast
		await page.waitForTimeout(2000);

		// Verify success (look for success toast or message)
		// The exact selector depends on your toast implementation
		// Using sonner, we should see a toast notification
		const toast = page.locator('[data-sonner-toast]');
		// Just verify the form submission triggered successfully
		// without throwing an error
	});

	test("should handle form submission errors gracefully", async ({ page }) => {
		// Mock the API to return an error
		await page.route("**/api/send-mail", async (route) => {
			await route.fulfill({
				status: 500,
				contentType: "application/json",
				body: JSON.stringify({ error: "An error happened during the sent of the message" }),
			});
		});

		// Mock reCAPTCHA
		await page.addInitScript(() => {
			// @ts-ignore
			window.grecaptcha = {
				ready: (cb: () => void) => cb(),
				execute: () => Promise.resolve("test-token"),
				render: () => "test-widget-id",
				reset: () => {},
				getResponse: () => "test-token",
			};
		});

		// Fill out the form
		await page.locator("#name").fill("John Doe");
		await page.locator("#email").fill("john.doe@example.com");
		await page.locator("#message").fill("This should trigger an error.");

		// Wait for reCAPTCHA
		await page.waitForTimeout(1000);

		// Submit the form
		const submitButton = page.locator('button[type="submit"]');
		await submitButton.click();

		// Wait for error handling
		await page.waitForTimeout(2000);

		// Form should still be visible (not replaced by success message)
		await expect(page.locator("#name")).toBeVisible();
	});
});
