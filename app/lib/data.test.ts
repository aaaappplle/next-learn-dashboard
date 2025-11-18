import { fetchCardData } from "./data";

jest.mock("postgres", () => {
  return jest.fn().mockImplementation(() => {
    const mockFn = (strings: any, ...values: any[]) => {
      const query =
        Array.isArray(strings) && strings.length > 0
          ? strings.join("")
          : String(strings || "");
      if (query.includes("FROM invoices") && query.includes("COUNT")) {
        return Promise.resolve({ count: "12" });
      }
      if (query.includes("FROM customers") && query.includes("COUNT")) {
        return Promise.resolve({ count: "6" });
      }
      if (query.includes("FROM invoices") && query.includes("SUM")) {
        return Promise.resolve([{ paid: "3000", pending: "900" }]);
      }
      return Promise.resolve([]);
    };
    return mockFn;
  });
});

describe("fetchCardData", () => {
  test("return card data", async () => {
    const result = await fetchCardData();
    expect(result).toEqual({
      numberOfCustomers: 6,
      numberOfInvoices: 12,
      totalPaidInvoices: "$30.00",
      totalPendingInvoices: "$9.00",
    });
  });
});
