import { chromium } from "@playwright/test";
import { createAuthSession } from "../utils/createAuthSession";
import path from "path";

const STORAGEPATH = path.resolve(__dirname, "state.json");

export default async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  try {
    const token = await createAuthSession({
      id: "1",
      email: "bella@best.com",
      name: "Bella",
    });

    await context.addCookies([
      {
        name: "authjs.session-token",
        value: token,
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        path: "/",
        domain: "localhost",
        expires: Math.round((Date.now() + 60 * 60 * 1000) / 1000),
      },
    ]);

    await context.storageState({ path: STORAGEPATH });
  } catch (error) {
    if (error instanceof Error) {
      console.error("error in global setup:", error.message);
    }
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}
