import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("home page", () => {
  test("render home page", async () => {
    render(<HomePage />);
    const link = screen.getByRole("link", { name: /Log in/i });
    expect(link).toBeInTheDocument();
  });
});
