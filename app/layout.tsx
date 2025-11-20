import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider";
import Header from "@/components/Header/Header";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TravelTrucks - Camper Rental",
  description: "Rent your dream camper for an unforgettable adventure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <TanStackProvider>
          <Header/>
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
