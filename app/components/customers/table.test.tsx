import { render, screen } from "@testing-library/react";
import { CustomersTable } from "./table";
import { customers } from "@/app/lib/placeholder-data";
import { FormattedCustomersTable } from "@/app/lib/definitions";

describe("CustomersTable", () => {
  test("render CustomersTable with empty array", () => {
    render(<CustomersTable customers={[]} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
  });
  test("render CustomersTable with data", () => {
    render(
      <CustomersTable customers={customers as FormattedCustomersTable[]} />
    );
    expect(screen.getAllByText("Evil Rabbit").length).toEqual(2);
    expect(screen.getAllByText("evil@rabbit.com").length).toEqual(2);
  });
});
