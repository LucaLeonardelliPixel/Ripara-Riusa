import type { Metadata } from "next";
import { Unbounded } from "next/font/google"; 
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded-raw", 
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      {/* Applichiamo la variabile al body */}
      <body className={`${unbounded.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}