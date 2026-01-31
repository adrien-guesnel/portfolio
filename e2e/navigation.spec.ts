import { expect, test } from "@playwright/test";

test.describe("Navigation Menu", () => {
  test("should have working menu links", async ({ page }) => {
    // Navigate to the page
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    // Check Skills link in the navigation menu
    const skillsLink = page.locator('nav[aria-label="Main navigation"] a[href="#skills"]');
    await expect(skillsLink).toBeVisible();
    await expect(skillsLink).toHaveAttribute("href", "#skills");

    // Check Projects link
    const projectsLink = page.locator('nav[aria-label="Main navigation"] a[href="#projects"]');
    await expect(projectsLink).toBeVisible();
    await expect(projectsLink).toHaveAttribute("href", "#projects");

    // Check Testimonials link
    const testimonialsLink = page.locator(
      'nav[aria-label="Main navigation"] a[href="#testimonials"]',
    );
    await expect(testimonialsLink).toBeVisible();
    await expect(testimonialsLink).toHaveAttribute("href", "#testimonials");

    // Check Contact link
    const contactLink = page.locator('nav[aria-label="Main navigation"] a[href="#contact"]');
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toHaveAttribute("href", "#contact");
  });

  test("should navigate to sections when clicking menu links", async ({ page }) => {
    // Navigate to the page
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    // Click on Skills link and verify navigation
    await page.locator('nav[aria-label="Main navigation"] a[href="#skills"]').click();
    await page.waitForURL(/\/en#skills/);

    // Click on Projects link and verify navigation
    await page.locator('nav[aria-label="Main navigation"] a[href="#projects"]').click();
    await page.waitForURL(/\/en#projects/);

    // Click on Testimonials link and verify navigation
    await page.locator('nav[aria-label="Main navigation"] a[href="#testimonials"]').click();
    await page.waitForURL(/\/en#testimonials/);

    // Click on Contact link and verify navigation
    await page.locator('nav[aria-label="Main navigation"] a[href="#contact"]').click();
    await page.waitForURL(/\/en#contact/);
  });

  test("should have working homepage logo link", async ({ page }) => {
    // Navigate to a section
    await page.goto("/en#skills");
    await page.waitForLoadState("networkidle");

    // Click on logo to go back to homepage - target the logo button in the navbar
    // The logo is a button with btn-circle class containing the Logo SVG
    const logoLink = page.locator("header a.btn-circle").first();
    await expect(logoLink).toBeVisible();
    await logoLink.click();

    // Wait for navigation - allow time for the page to update
    await page.waitForURL(/\/en\/?$/);

    // Verify we're on homepage (no hash in URL)
    expect(page.url()).toMatch(/\/en\/?$/);
  });
});
