import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/components/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "This is a Acme Dashboard System",
  metadataBase: new URL("https://next-learn-dashboard-eta-seven.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
