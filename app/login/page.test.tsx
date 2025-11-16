import { render, screen } from "@testing-library/react";
import LoginPage from "./page";

jest.mock("@/app/components/login-form", () => ({
  __esModule: true,
  default: () => <div>LoginForm</div>,
}));

describe("LoginPage layout", () => {
  it("renders the logo and login form", () => {
    render(<LoginPage />);

    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("LoginForm")).toBeInTheDocument();
  });
});
