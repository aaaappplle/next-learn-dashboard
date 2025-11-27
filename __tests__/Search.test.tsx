import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "@/app/components/search";

const mockRouterReplace = jest.fn();
const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockImplementation(() => {
    return {
      replace: mockRouterReplace,
    };
  }),
  usePathname: jest.fn().mockImplementation((pathArgs) => {
    return "/dashboard/customers";
  }),
  useSearchParams: jest.fn().mockImplementation(() => {
    return new URLSearchParams(window.location.search);
  }),
}));

describe("search component", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/dashboard/customers");
  });

  test("render the search input with the placeholder", () => {
    render(<Search placeholder="Search here..." />);
    expect(screen.getByPlaceholderText("Search here...")).toBeInTheDocument();
  });

  test("call replace with correct query parameters when the search term changes", async () => {
    render(<Search placeholder="Search here..." />);

    const input = screen.getByPlaceholderText("Search here...");

    userEvent.type(input, "test");

    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledWith(
        "/dashboard/customers?page=1&query=test"
      );
    });

    userEvent.clear(input);

    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledWith(
        "/dashboard/customers?page=1"
      );
    });
  });
});
