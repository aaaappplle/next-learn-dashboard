import { test } from "@playwright/test";
import { createAuthSession } from "../utils/createAuthSession";

test("login", async ({ context }) => {
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
      expires: Math.round((Date.now() + 2 * 60 * 1000) / 1000),
    },
  ]);

  await context.storageState({ path: "e2e/storage/state.json" });
});
