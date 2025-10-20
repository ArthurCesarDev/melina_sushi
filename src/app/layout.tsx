
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext" 

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sushi Melina 🍣",
  description: "Delivery artesanal de sushi com amor e sabor.",
  icons: {
    icon: "/favicon.ico", // 👈 arquivo salvo em /public/favicon.ico
    shortcut: "/favicon.ico", // opcional, ajuda navegadores antigos
    apple: "/apple-touch-icon.png", // 👈 opcional (caso queira ícone no iPhone)
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        {/* 👇 envolve toda a aplicação com o CartProvider */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}