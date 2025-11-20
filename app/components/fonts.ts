import { Inter, Lusitana } from "next/font/google";
import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-lusitana",
  display: "swap",
});

export const lusitana = localFont({
  src: [
    {
      path: "../../public/fonts/lusitana-400.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-lusitana",
  display: "swap",
});
