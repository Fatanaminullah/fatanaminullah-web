import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

const metadataBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  "https://fatanaminullah.com";

const defaultTitle = "Fatan Aminullah — Coming Soon";
const defaultDescription =
  "The portfolio of Fatan Aminullah is being tuned for launch. Frontend development, systems thinking, and digital craft.";

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: defaultTitle,
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName: "Fatan Aminullah",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1730,
        height: 909,
        alt: "Coming soon — Fatan Aminullah portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og-image.png"],
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
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
