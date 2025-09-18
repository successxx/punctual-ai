import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "punctual.ai - Simple Scheduling Platform",
  description: "Let your clients book appointments with you instantly. No back-and-forth emails, no confusion. Simple scheduling without the hassle.",
  keywords: "scheduling, appointments, booking, calendar, meetings, consultations, time management",
  authors: [{ name: "punctual.ai" }],
  creator: "punctual.ai",
  publisher: "punctual.ai",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://punctual.ai'),
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'mask-icon', url: '/icon.svg', color: '#000000' }
    ]
  },
  openGraph: {
    title: "punctual.ai - Simple Scheduling Platform",
    description: "Let your clients book appointments with you instantly. No back-and-forth emails, no confusion.",
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://punctual.ai',
    siteName: "punctual.ai",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'punctual.ai - Simple Scheduling Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "punctual.ai - Simple Scheduling Platform",
    description: "Let your clients book appointments with you instantly.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/apple-touch-icon.png'
  },
  manifest: '/manifest.json'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
