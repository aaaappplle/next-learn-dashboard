import { render, fireEvent, screen } from "@testing-library/react";
import Button from "@/app/components/button";

describe("Button Component", () => {
  test("renders with text", () => {
    render(<Button>Click Me</Button>);
    const text = screen.getByText("Click Me");
    expect(text).toBeInTheDocument();
  });

  test("renders with click", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const text = screen.getByText("Click Me");
    fireEvent.click(text);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders with disabled", () => {
    render(<Button disabled={true}>Disabled</Button>);
    const text = screen.getByText("Disabled");
    expect(text).toBeDisabled();
  });
});
