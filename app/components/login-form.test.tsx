// tests/components/LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "@/app/components/login-form";
import * as actions from "@/app/lib/actions";

// Mock next/navigation's useSearchParams
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => null, // default callbackUrl
  }),
}));

jest.mock("@/app/lib/actions", () => ({
  authenticate: jest.fn(),
}));

describe("LoginForm component", () => {
  it("renders input fields and button", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("calls authenticate on form submit", async () => {
    (actions.authenticate as jest.Mock).mockResolvedValue(undefined);

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(actions.authenticate).toHaveBeenCalled();
    });
  });

  it("displays error message from authenticate", async () => {
    (actions.authenticate as jest.Mock).mockResolvedValue(
      "Invalid credentials"
    );

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrong" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
