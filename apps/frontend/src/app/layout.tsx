import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Modern Full Stack Template",
  description: "A production-ready template built with Next.js, Express, and PostgreSQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
