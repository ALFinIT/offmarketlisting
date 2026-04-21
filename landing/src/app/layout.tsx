import type { Metadata } from "next";
import "./globals.css";

const title =
  "Off-Market Listing Turkey | Exclusive Istanbul & Bodrum Properties";
const description =
  "Private, off-market real estate in Istanbul, Bodrum & Antalya. Concierge service, verified listings, full due diligence. For serious buyers only.";

export const metadata: Metadata = {
  metadataBase: new URL('https://offmarketturkey.com'),
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
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                const swallow = function(message) {
                  return typeof message === 'string' && message.includes('Cannot redefine property: ethereum');
                };
                const previousOnError = window.onerror;
                window.onerror = function(message, source, lineno, colno, error) {
                  if (swallow(String(message || (error && error.message) || ''))) return true;
                  if (typeof previousOnError === 'function') return previousOnError(message, source, lineno, colno, error);
                  return false;
                };
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                const originalDefineProperty = Object.defineProperty;
                Object.defineProperty = function(target, property, descriptor) {
                  try {
                    return originalDefineProperty(target, property, descriptor);
                  } catch (err) {
                    const prop = String(property || '');
                    const message = err && err.message ? String(err.message) : '';
                    if (prop === 'ethereum' && message.includes('Cannot redefine property: ethereum')) {
                      return target;
                    }
                    throw err;
                  }
                };
                window.addEventListener('error', (e) => {
                  if (e && e.message && typeof e.message === 'string' && e.message.includes('Cannot redefine property: ethereum')) {
                    e.preventDefault();
                  }
                }, true);
                window.addEventListener('unhandledrejection', (e) => {
                  const msg = (e && e.reason && e.reason.message) || (e && e.reason) || '';
                  if (typeof msg === 'string' && msg.includes('Cannot redefine property: ethereum')) {
                    e.preventDefault();
                  }
                }, true);
              }
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
