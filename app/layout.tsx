import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutHookProvider from "@/providers/LayoutHookProvider";
import { LayoutProvider } from "@/contexts/LayoutContext";

const fontPlusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MPK",
  description: "Web Mpk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <LayoutProvider>
        <LayoutHookProvider fontPlusJakartaSans={fontPlusJakartaSans}>
          {children}
        </LayoutHookProvider>
      </LayoutProvider>
    </html>
  );
}
