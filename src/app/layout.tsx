import type { Metadata } from "next"
import "./globals.css"

export function generateMetadata(): Metadata {
  const day = new Date().toLocaleDateString("en-us", { weekday: "long" });

  return {
    icons: {
      icon: '/transparent-logo-icon.png',
      shortcut: '/transparent-logo-icon.png',
    },
    title: `WeekFlow | ${day}`,
    description: "Verify your daily tasks.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}