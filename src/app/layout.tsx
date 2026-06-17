import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const display = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rosemedical.pl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rose Medical Trade",
    template: "%s | Rose Medical",
  },
  description:
    "Rose Medical Trade supplies selected medical equipment, disposable products, and endoscopic accessories.",
  icons: {
    icon: [
      { url: "/assets/favicon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/assets/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/assets/favicon-light.png",
  },
  openGraph: {
    title: "Rose Medical Trade",
    description:
      "Selected medical equipment, disposable products, and endoscopic accessories.",
    url: siteUrl,
    siteName: "Rose Medical Trade",
    images: [{ url: "/assets/rosemedical-og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rose Medical Trade",
    description:
      "Selected medical equipment, disposable products, and endoscopic accessories.",
    images: ["/assets/rosemedical-og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background font-sans">{children}</body>
    </html>
  );
}
