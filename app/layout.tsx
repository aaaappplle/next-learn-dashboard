import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/components/fonts";

export const metadata: Metadata = {
  title: "Acme System",
  description: "This is a Acme System",
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
