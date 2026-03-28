import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const title =
  "Off-Market Listing Turkey | Exclusive Istanbul & Bodrum Properties";
const description =
  "Private, off-market real estate in Istanbul, Bodrum & Antalya. Concierge service, verified listings, full due diligence. For serious buyers only.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "off-market real estate",
    "Turkey property",
    "Istanbul",
    "Bodrum",
    "Antalya",
    "citizenship by investment",
    "luxury property",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://offmarketturkey.com/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
