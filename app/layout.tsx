
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-6R8ZB0BXS2";

const SITE_URL = "https://everyday-utility.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Free Online Calculators & PDF Tools",
    template: "%s | Everyday Utility",
  },

  description:
    "Use free online calculators and PDF tools to calculate EMIs, salary, taxes and percentages, merge PDFs, convert files, and simplify everyday tasks.",

  applicationName: "Everyday Utility",

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Everyday Utility",
    title: "Free Online Calculators & PDF Tools | Everyday Utility",
    description:
      "Calculate EMIs, salary, taxes and percentages, merge PDFs, convert files, and simplify everyday tasks with free online tools.",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title: "Free Online Calculators & PDF Tools | Everyday Utility",
    description:
      "Free online calculators and PDF tools for money, documents, and everyday tasks.",
  },

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
