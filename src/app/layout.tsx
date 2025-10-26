import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Recipify - Share Your Culinary Creations",
    template: "%s | Recipify",
  },
  description:
    "Discover, create, and share delicious recipes with Recipify. A modern cooking platform where food lovers connect and inspire each other with their culinary creations.",
  keywords: [
    "recipes",
    "cooking",
    "food",
    "culinary",
    "recipe sharing",
    "home cooking",
    "meal planning",
    "cooking community",
  ],
  authors: [{ name: "Recipify Team" }],
  creator: "Recipify",
  publisher: "Recipify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000"),
  openGraph: {
    title: "Recipify - Share Your Culinary Creations",
    description:
      "Discover, create, and share delicious recipes with Recipify. A modern cooking platform where food lovers connect and inspire each other.",
    url: "/",
    siteName: "Recipify",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recipify - Share Your Culinary Creations",
    description:
      "Discover, create, and share delicious recipes with Recipify. A modern cooking platform for food lovers.",
    creator: "@recipify",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
