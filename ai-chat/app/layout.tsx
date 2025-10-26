import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Chat PPT Generator",
  description: "Generate and edit PowerPoint presentations using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
