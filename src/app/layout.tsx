import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ServiceWorkerRegister from "./ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "WeekFlow",
  description: "Verify your daily tasks.",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo-icon-meta.png",
    shortcut: "/logo-icon-meta.png",
  },
};

export const viewport = {
  themeColor: "#1E56A0",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ServiceWorkerRegister />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}