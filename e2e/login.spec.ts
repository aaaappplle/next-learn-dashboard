import { test, expect } from "@playwright/test";

test("login flow", async ({ page }) => {
  await page.goto("/login");

  await page.fill("#email", "bella@best.com");
  await page.fill("#password", "Admin@1");
  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
