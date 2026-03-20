import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bharat 24x7 – AI Powered News",
  description:
    "Get the latest news from India and the world. AI-ranked, fast, and distraction-free news platform.",

  keywords: [
    "news",
    "india news",
    "latest news",
    "AI news",
    "tech news",
    "bharat news",
  ],

  openGraph: {
    title: "Bharat 24x7 – AI News",
    description:
      "Smart news powered by AI ranking. Fast, clean, and real-time.",
    url: "https://bharath-24x7-news-aggregator.vercel.app",
    siteName: "Bharat 24x7",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "google774a8aa511a77d95.html",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}