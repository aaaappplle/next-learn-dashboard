import { Card } from "@/app/components/dashboard/cards";
import { render, screen } from "@testing-library/react";

describe("card component", () => {
  test("render card", () => {
    render(<Card title="collect" value={4000} type="collected" />);
    expect(
      screen.getByRole("heading", { name: "collect" })
    ).toBeInTheDocument();
    expect(screen.getByText("4000")).toBeInTheDocument();

    const icon = document.querySelector("svg");
    expect(icon).not.toBeNull();
  });
});
