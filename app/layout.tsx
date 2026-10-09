import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-6R8ZB0BXS2";

export const metadata: Metadata = {
  metadataBase: new URL("https://everyday-utility.vercel.app"),

  title: {
    default: "Everyday Utility",
    template: "%s | Everyday Utility",
  },

  description:
    "Simple free online tools for money, daily life, calculations, and documents.",

  verification: {
    google: "mO_U3q-Y5CbMXh1XSomMnYhOq9krA25ZJ06oh4CD9hk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
