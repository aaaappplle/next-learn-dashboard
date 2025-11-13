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
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignupFormSchema.safeParse(credentials);
        if (!validatedFields.success) {
          throw new CustomError("Invalid input format");
        }

        const { email, password } = validatedFields.data;
        const user = await getUser(email);

        if (!user) {
          throw new CustomError("Email not found");
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          throw new CustomError("Password incorrect");
        }
        return user;
      },
    }),
  ],
});
