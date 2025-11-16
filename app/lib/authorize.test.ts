import { authorize, CustomError } from "@/app/lib/authorize";
import { getUser } from "@/app/lib/db/auth";
import { compare } from "bcrypt";

jest.mock("@/app/lib/db/auth");
jest.mock("bcrypt");

describe("authorize function", () => {
  const mockUser = {
    email: "test@example.com",
    password: "Test@1",
  };

  test("throws CustomError for invalid input", async () => {
    await expect(authorize({ email: 123, password: true })).rejects.toThrow(
      CustomError
    );
  });

  test("throws CustomError if user not found", async () => {
    (getUser as jest.Mock).mockResolvedValue(null);

    await expect(
      authorize({ email: "haha@example.com", password: "Test@1" })
    ).rejects.toThrow("Email not found");
  });

  test("throws CustomError if password is incorrect", async () => {
    (getUser as jest.Mock).mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(false);

    await expect(
      authorize({ email: "test@example.com", password: "Test@0" })
    ).rejects.toThrow("Password incorrect");
  });

  test("returns user if credentials are correct", async () => {
    (getUser as jest.Mock).mockResolvedValue(mockUser);
    (compare as jest.Mock).mockResolvedValue(true);

    const result = await authorize({
      email: "test@example.com",
      password: "Test@1",
    });

    expect(result).toEqual(mockUser);
  });
});
