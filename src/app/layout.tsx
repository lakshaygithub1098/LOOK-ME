import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  title: "LOOK@ME – Premium Kurtis & Women's Fashion",
  description:
    "Shop premium handcrafted kurtis and women's Indian wear at LOOK@ME. Festive collections, casual everyday styles, summer picks and more. Order directly on WhatsApp.",
  keywords: "kurtis, Indian women's fashion, ethnic wear, festive kurti, anarkali, chikankari, cotton kurti",
  openGraph: {
    title: "LOOK@ME – Wear Confidence. Wear LOOK@ME.",
    description: "Premium handcrafted kurtis for every occasion. Shop our exclusive collections.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
