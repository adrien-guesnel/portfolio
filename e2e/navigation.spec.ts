import { test, expect } from "@playwright/test";

test.describe("Navigation Menu", () => {
	test("should have working menu links", async ({ page }) => {
		// Navigate to the page
		await page.goto("/en");
		await page.waitForLoadState("networkidle");

		// Check Skills link
		const skillsLink = page.getByRole("link", { name: "Skills" });
		await expect(skillsLink).toBeVisible();
		await expect(skillsLink).toHaveAttribute("href", "#skills");

		// Check Projects link
		const projectsLink = page.getByRole("link", { name: "Projects" });
		await expect(projectsLink).toBeVisible();
		await expect(projectsLink).toHaveAttribute("href", "#projects");

		// Check Testimonials link
		const testimonialsLink = page.getByRole("link", { name: "Testimonials" });
		await expect(testimonialsLink).toBeVisible();
		await expect(testimonialsLink).toHaveAttribute("href", "#testimonials");

		// Check Contact link
		const contactLink = page.getByRole("link", { name: "Contact" });
		await expect(contactLink).toBeVisible();
		await expect(contactLink).toHaveAttribute("href", "#contact");
	});

	test("should navigate to sections when clicking menu links", async ({ page }) => {
		// Navigate to the page
		await page.goto("/en");
		await page.waitForLoadState("networkidle");

		// Click on Skills link and verify navigation
		await page.getByRole("link", { name: "Skills" }).click();
		await page.waitForTimeout(1000); // Wait for smooth scroll
		await expect(page).toHaveURL(/\/en#skills/);

		// Click on Projects link and verify navigation
		await page.getByRole("link", { name: "Projects" }).click();
		await page.waitForTimeout(1000);
		await expect(page).toHaveURL(/\/en#projects/);

		// Click on Testimonials link and verify navigation
		await page.getByRole("link", { name: "Testimonials" }).click();
		await page.waitForTimeout(1000);
		await expect(page).toHaveURL(/\/en#testimonials/);

		// Click on Contact link and verify navigation
		await page.getByRole("link", { name: "Contact" }).click();
		await page.waitForTimeout(1000);
		await expect(page).toHaveURL(/\/en#contact/);
	});

	test("should have working homepage logo link", async ({ page }) => {
		// Navigate to a section
		await page.goto("/en#skills");
		await page.waitForLoadState("networkidle");

		// Click on logo to go back to homepage
		const logoLink = page.getByRole("link", { name: "Homepage" }).first();
		await expect(logoLink).toBeVisible();
		await logoLink.click();

		// Wait for navigation
		await page.waitForTimeout(500);

		// Verify we're on homepage (no hash in URL)
		expect(page.url()).toMatch(/\/en\/?$/);
	});
});
