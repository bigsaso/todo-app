import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site"
import "@/styles/globals.css"

import { cn } from "@/lib/utils"

import { SiteHeader } from "@/components/site-header";

import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">
            {children}
            </div>
            </div>
          </ThemeProvider>
      </body>
    </html>
  );
}
