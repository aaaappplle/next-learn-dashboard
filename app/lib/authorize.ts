import { SignupFormSchema } from "./definitions";
import bcrypt from "bcrypt";
import { getUser } from "./db/auth";

export class CustomError extends Error {
  code = "custom_error";
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}

export async function authorize(credentials: Partial<Record<string, unknown>>) {
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
}
