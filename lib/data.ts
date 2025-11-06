import {
  CardData,
  LatestInvoice,
  LatestInvoiceRaw,
  Revenue,
} from "./definitions";
import { formatCurrency } from "./utils";

export async function fetchCardData() {
  const data = {
    numberOfCustomers: 50000,
    numberOfInvoices: 8000,
    totalPaidInvoices: 100000,
    totalPendingInvoices: 32000,
  };
  return data;
}

export async function fetchRevenue() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data: Revenue[] = [
      { month: "Jan", revenue: 1300 },
      { month: "Feb", revenue: 3300 },
      { month: "Mar", revenue: 2300 },
      { month: "Apr", revenue: 6300 },
      { month: "May", revenue: 7300 },
      { month: "Jun", revenue: 1300 },
      { month: "Jul", revenue: 3300 },
      { month: "Agu", revenue: 2300 },
      { month: "Sep", revenue: 6300 },
      { month: "Oct", revenue: 7300 },
      { month: "Nov", revenue: 6300 },
      { month: "Dec", revenue: 7300 },
    ];

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchLatestInvoices() {
  try {
    const data: LatestInvoice[] = new Array(5).fill(0).map((t, index) => {
      const invoice = {
        id: `invoice_${index}`,
        image_url: "/customers/amy-burns.png",
        name: `invoice${index}`,
        email: "test@invoice.com",
        amount: formatCurrency(Math.random() * 10000),
      };
      return invoice;
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}
