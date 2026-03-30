import type { Metadata } from "next";
import { JetBrains_Mono, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AK68A",
  description: "Software engineer building at the intersection of AI, security, and payments.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "AK68A",
    description: "Software engineer building at the intersection of AI, security, and payments.",
    url: "https://ak68a.co",
    siteName: "AK68A",
    images: [
      {
        url: "/social.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AK68A",
    description: "Software engineer building at the intersection of AI, security, and payments.",
    images: ["/social.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.className} ${robotoMono.variable}`} suppressHydrationWarning>
      <ThemeProvider>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
