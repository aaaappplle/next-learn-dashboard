import { defineConfig, devices } from "@playwright/test";
import path from "path";

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env.local") });

const PORT = process.env.PORT || 3000;

const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: path.join(__dirname, "e2e"),
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  outputDir: "test-results/",
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { outputFolder: "playwright-reporter" }]],
  use: {
    headless: true,
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10 * 1000,
  },
  projects: [
    {
      name: "setup",
      testMatch: "setup/**/*.setup.ts",
    },
    {
      name: "Authenticated Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "e2e/storage/state.json",
      },
      dependencies: ["setup"],
      testMatch: "auth/**/*.spec.ts",
    },
    {
      name: "Authenticated Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
        storageState: "e2e/storage/state.json",
      },
      dependencies: ["setup"],
      testMatch: "auth/**/*.spec.ts",
    },
    {
      name: "Public Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
      testMatch: "public/**/*.spec.ts",
    },
    {
      name: "Public Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
      },
      testMatch: "public/**/*.spec.ts",
    },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
