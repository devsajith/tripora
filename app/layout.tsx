import type { Metadata } from "next";
import { Playfair_Display, Manrope, Poppins } from "next/font/google";
import "./globals.css";
import BottomNavbar from "./components/BottomNavbar";
import ScrollObserver from "./components/ScrollObserver";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tripora68.in"),
  title: "Tripora | Luxury Travel Kerala & India",
  description: "Experience bespoke luxury travel across Kerala's serene backwaters and India's majestic heritage enclaves. Curated journeys for the discerning traveler.",
  icons: {
    icon: "/logo.webp",
    shortcut: "/favicon.ico",
    apple: "/logo.webp",
  },
  verification: {
    google: "bd6f3196f5d10993",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <ScrollObserver />
        {children}
        <BottomNavbar />
      </body>
    </html>
  );
}
