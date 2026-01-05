// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeProviderClient from "@/theme/ThemeProviderClient";
import { ToastProvider } from "@/context/ToastContext";
import ToastContainer from "@/components/ToastContainer";
import Footer from "@/components/FooterComponents"; 

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
  className={`${inter.variable} ${robotoMono.variable} antialiased min-h-screen flex flex-col bg-[#0b0b0b] text-gray-200`}
>

        <CartProvider>
          <ThemeProvider>
            <ToastProvider>
              <ThemeProviderClient>
                {/* CONTEÚDO DA PÁGINA */}
                <main className="flex-1">{children}</main>

                {/* FOOTER */}
                <Footer />

                {/* TOAST */}
                <ToastContainer />
              </ThemeProviderClient>
            </ToastProvider>
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
