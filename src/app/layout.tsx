import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { AskFatanProvider } from "@/components/ask-fatan/ask-fatan-context";
import { AskFatanUI } from "@/components/ask-fatan/ask-fatan";
import { Cursor } from "@/components/cursor/cursor";
import { Nav } from "@/components/nav/nav";
import { Terminal } from "@/components/terminal/terminal";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fatan Aminullah — Earth Edition",
  description:
    "Senior Software Developer — crafting high-performance digital experiences from Jakarta.",
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
      <body>
        <AskFatanProvider>
          <div className="paper" aria-hidden />
          <div className="vignette" aria-hidden />
          <Nav />
          <Cursor />
          <Terminal />
          <AskFatanUI />
          {children}
        </AskFatanProvider>
      </body>
    </html>
  );
}
