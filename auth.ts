import NextAuth, { CredentialsSignin } from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { SignupFormSchema, User } from "./app/lib/definitions";
import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
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
