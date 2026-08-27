import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = localFont({
  src: "./fonts/dmserif-regular-latin.woff2",
  variable: "--font-dm-serif",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alextapio.com"),
  title: {
    default: "Alex Tapio | Strategic Consultant in Dubai",
    template: "%s",
  },
  description:
    "Former Deloitte consultant helping firms build investor credibility through clear, deal-winning narratives.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Alex Tapio", url: "https://alextapio.com" }],
  creator: "Alex Tapio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Alex Tapio",
    title: "Alex Tapio | Strategic Consultant in Dubai",
    description:
      "Strategic consultant helping firms build investor credibility through clear, deal-winning narratives.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Tapio | Strategic Consultant in Dubai",
    description:
      "Strategic consultant helping firms build investor credibility through clear, deal-winning narratives.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
      </head>
      <body>{children}</body>
    </html>
  );
}
