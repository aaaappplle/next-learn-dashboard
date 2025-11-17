import NextAuth, { AuthError } from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { authorize, CustomError } from "@/app/lib/authorize";

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          return await authorize(credentials);
        } catch (error) {
          if (error instanceof CustomError) {
            throw new AuthError(error.code, { cause: error });
          }
          throw error;
        }
      },
    }),
  ],
});
