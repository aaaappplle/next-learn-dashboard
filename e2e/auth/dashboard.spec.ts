import { test, expect } from "@playwright/test";

test("dashboard", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(page.getByText("Collected")).toBeVisible();
  await expect(page.getByText("Pending")).toBeVisible();
  await expect(page.getByText("Total Invoices")).toBeVisible();
  await expect(page.getByText("Total Customers")).toBeVisible();

  await expect(page.locator("p", { hasText: /^[0-9]+$/ })).toHaveCount(2);
});
