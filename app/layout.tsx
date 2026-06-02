import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = "https://geo.urvenue.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Does your business exist for AI? — urvenue",
  description:
    "GEO — Generative Engine Optimization. Make ChatGPT, Claude, and Perplexity find, understand, and recommend you.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "urvenue",
    title: "Does your business exist for AI?",
    description:
      "GEO — Generative Engine Optimization. Make ChatGPT, Claude, and Perplexity find, understand, and recommend you.",
    locale: "en_US",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Vibe — GEO Protocol v1 by urvenue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Does your business exist for AI?",
    description:
      "Measure your GEO score in 60 seconds. Make ChatGPT, Claude, and Perplexity recommend you.",
    images: ["/images/og-cover.jpg"],
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/scene-poster.jpg"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="video"
          type="video/mp4"
          href="/videos/scene-mobile.mp4"
          media="(max-width: 768px)"
        />
        <link
          rel="preload"
          as="video"
          type="video/mp4"
          href="/videos/scene.mp4"
          media="(min-width: 769px)"
        />
      </head>
      <body className="min-h-full text-white">
        {children}
      </body>
    </html>
  );
}
