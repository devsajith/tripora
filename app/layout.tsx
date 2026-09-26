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
  title: {
    default: "Kerala Tour Packages & Travel Agency | Tripora",
    template: "%s | Tripora",
  },
  description: "Experience bespoke luxury travel across Kerala's serene backwaters and India's majestic heritage enclaves. Curated journeys for the discerning traveler.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <ScrollObserver />
        {children}
        <BottomNavbar />
      </body>
    </html>
  );
}
