import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "@/contexts/LanguageContext";

export function generateMetadata(): Metadata {
  const day = new Date().toLocaleDateString("en-us", { weekday: "long" });

  return {
    icons: {
      icon: '/logo-icon-meta.png',
      shortcut: '/logo-icon-meta.png',
    },
    title: `WeekFlow | ${day}`,
    description: "Verify your daily tasks.",
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}