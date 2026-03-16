import type { Metadata } from "next"
import "./globals.css"

export function generateMetadata(): Metadata {
  const day = new Date().toLocaleDateString("en-us", {
    weekday: "long",
  });

  return {
    title: `WeekFlow | ${day}`,
    description: "Veja suas tarefas de hoje.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
