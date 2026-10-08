import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Everyday Utility",
  description: "Simple tools for money, daily life, and documents.",
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