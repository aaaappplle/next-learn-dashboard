import { User } from "@/app/lib/definitions";
import { JWT, encode } from "next-auth/jwt";

export async function createAuthSession(user: Omit<User, "password">) {
  if (!process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET is not defined");
  }

  const payload: JWT = {
    sub: user.id,
    email: user.email,
    name: user.name,
  };
  const token = await encode({
    token: payload,
    secret: process.env.AUTH_SECRET,
    salt:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  return token;
}
