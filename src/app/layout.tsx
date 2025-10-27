// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeProviderClient from "@/theme/ThemeProviderClient";


import { ToastProvider } from "@/context/ToastContext";
import ToastContainer from "@/components/ToastContainer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const robotoMono = Roboto_Mono({ variable: "--font-roboto-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cardápio Virtual",
  description: "Delivery artesanal de sushi com amor e sabor.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <CartProvider>
          <ThemeProvider>
            <ToastProvider>
              <ThemeProviderClient>
                {children}
                <ToastContainer />
              </ThemeProviderClient>
            </ToastProvider>
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
