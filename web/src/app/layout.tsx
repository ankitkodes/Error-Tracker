import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import AuthProvider from "@/context/AuthProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/context/queryProvider";


const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading', // Simplified variable name
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

// ----- SEO Metadata -----
export const metadata: Metadata = {
  // Base URL for resolving relative OG images, canonical URLs, etc.
  metadataBase: new URL("https://bugtrace.in"),

  title: {
    default: "BugTrace — Real-Time Error Tracking for Developers",
    template: "%s | BugTrace",
  },
  description:
    "BugTrace is a real-time error tracking and monitoring platform. Detect, diagnose, and resolve production bugs faster with instant alerts, full stack traces, and actionable analytics.",
  keywords: [
    "error tracking",
    "bug tracking",
    "error monitoring",
    "real-time alerts",
    "stack trace",
    "debugging tool",
    "developer tools",
    "application monitoring",
    "BugTrace",
  ],
  authors: [{ name: "BugTrace" }],
  creator: "BugTrace",

  // Google Search Console verification
  verification: {
    google: "J6l-uKAP_VPT0gfc6ZTnNw2uzhtmQgreHppfXHL86AU",
  },

  // Open Graph — Facebook, LinkedIn, Discord previews
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bugtrace.in",
    siteName: "BugTrace",
    title: "BugTrace — Real-Time Error Tracking for Developers",
    description:
      "Detect, diagnose, and resolve production bugs faster with instant alerts, full stack traces, and actionable analytics.",
    images: [
      {
        url: "/Images/bugtrace.png",
        width: 1200,
        height: 630,
        alt: "BugTrace Dashboard Preview",
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: "BugTrace — Real-Time Error Tracking for Developers",
    description:
      "Detect, diagnose, and resolve production bugs faster with instant alerts, full stack traces, and actionable analytics.",
    images: ["/Images/bugtrace.png"],
  },

  // Misc
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

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BugTrace",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "Real-time error tracking and monitoring platform for developers. Detect, diagnose, and resolve production bugs faster.",
  url: "https://bugtrace.in",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased overflow-x-hidden bg-[#08070e]`}
      >
        {/* JSON-LD structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <AuthProvider>
            {children}
            <SpeedInsights />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
