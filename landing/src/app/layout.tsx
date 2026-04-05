import type { Metadata } from "next";
import "./globals.css";

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
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://offmarketturkey.com/",
    locale: "en_US",
    images: [{ url: '/favicon.svg' }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ['/favicon.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
