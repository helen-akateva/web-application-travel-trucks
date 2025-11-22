import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";

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
             <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#101828',
                border: '1px solid #DADDE1',
              },
              success: {
                iconTheme: {
                  primary: '#E44848',
                  secondary: '#fff',
                },
              },
            }}
          />
        </TanStackProvider>
      </body>
    </html>
  );
}
