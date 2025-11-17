import { render, screen } from "@testing-library/react";
import Page from "./page";

jest.mock("@/app/components/dashboard/cards", () => ({
  __esModule: true,
  default: () => <div>cards</div>,
}));

jest.mock("@/app/components/dashboard/latest-invoices", () => ({
  __esModule: true,
  default: () => <div>latest invoices</div>,
}));

jest.mock("@/app/components/dashboard/revenue-chart", () => ({
  __esModule: true,
  default: () => <div>revenue chart</div>,
}));

describe("dashboard page", () => {
  test("render dashboard page", async () => {
    render(await Page());

    expect(
      screen.getByRole("heading", { name: /Dashboard/i })
    ).toBeInTheDocument();
    expect(screen.getByText("cards")).toBeInTheDocument();
    expect(screen.getByText("latest invoices")).toBeInTheDocument();
    expect(screen.getByText("revenue chart")).toBeInTheDocument();
  });
});
