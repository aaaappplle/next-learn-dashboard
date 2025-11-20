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
  globalSetup: path.resolve("./e2e/setup/global-setup"),
  use: {
    storageState: "./e2e/setup/state.json",
    headless: true,
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10 * 1000,
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
      },
    },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
