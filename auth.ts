import NextAuth, { CredentialsSignin } from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { SignupFormSchema } from "./lib/definitions";
import bcrypt from "bcrypt";

async function getUser(email: string) {
  if (email === "bella@123.com") {
    return { userId: "1", email, password: await bcrypt.hash("12abC@", 10) };
  }
  return null;
}

class CustomError extends CredentialsSignin {
  code = "custom_error";
}

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validedFileds = SignupFormSchema.safeParse(credentials);
        if (validedFileds.success) {
          const { email, password } = validedFileds.data;
          const user = await getUser(email);

          if (!user) return new CustomError();

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) return new CustomError();

          return user;
        }

        return null;
      },
    }),
  ],
});
