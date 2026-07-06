import type { Metadata, Viewport } from "next"; 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import "primereact/resources/themes/lara-light-blue/theme.css"; 
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0f172a", 
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, 
};

export const metadata: Metadata = {
  title: {
    default: "Premium E-Commerce Store | Buy the Best Products",
    template: "%s | Premium E-Commerce Store",
  },
  description: "Discover premium quality products at the best prices. Enjoy fast shipping, secure checkouts, and 24/7 customer support.",
  keywords: ["e-commerce", "online shopping", "buy products", "premium store", "next.js e-commerce"],
  authors: [{ name: "Your Company Name", url: "https://yourwebsite.com" }],
  creator: "Your Company Name",
  publisher: "Your Company Name",
  metadataBase: new URL("https://ecommence-navy.vercel.app/"),
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ecommence-navy.vercel.app/",
    title: "Premium E-Commerce Store | Buy the Best Products",
    description: "Discover premium quality products at the best prices. Fast shipping and secure checkout.",
    siteName: "Premium E-Commerce Store",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Premium E-Commerce Store Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Premium E-Commerce Store | Buy the Best Products",
    description: "Discover premium quality products at the best prices.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ">
        <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50 border-b border-slate-800">
          <Navbar />
        </header>

        <main className="flex-1">
          {children}
        </main>

        <Footer />
        <Analytics/>
      </body>
    </html>
  );
}