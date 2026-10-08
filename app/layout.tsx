import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}