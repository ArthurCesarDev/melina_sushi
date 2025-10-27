// components/CardapioComponents.tsx
// components/CardapioComponents.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/UI/ProductCard";
import ComboModal from "@/components/UI/ComboModal";
import CartDrawer from "@/components/UI/CartDrawer";
import FloatingCartButton from "@/components/UI/FloatingCartButton";
import AuthModal from "@/components/UI/AuthModal";
import type { Product } from "@/types/Product";
import Cookies from "js-cookie";
import { refreshUserToken, isTokenValid, getUserToken, logoutUser } from "@/services/authClient";


export default function CardapioComponents() {
  const { cart, addToCart, removeFromCart, decreaseFromCart, total } = useCart();
  const [selectedCombo, setSelectedCombo] = useState<Product | null>(null);
  const [isCartOpen, setCartOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  // Controle de autenticação
  useEffect(() => {
    const run = async () => {
      setAuthChecking(true);

      const token = getUserToken();
      const refreshToken = Cookies.get("user_refreshToken");

      if (!token && !refreshToken) {
        console.log("❌ Nenhum token encontrado — mostrar login");
        setShowAuth(true);
        setAuthChecking(false);
        return;
      }

      try {
        if (token && isTokenValid(token)) {
          console.log("✅ Token válido — sessão ativa");
          setShowAuth(false);
        } else if (refreshToken) {
          console.log("⏳ Token expirado — tentando refresh...");
          await refreshUserToken();
          setShowAuth(false);
        } else {
          console.log("❌ Nenhum refresh token — forçar login");
          logoutUser();
          setShowAuth(true);
        }
      } catch (error) {
        console.error("❌ Erro ao verificar autenticação:", error);
        logoutUser();
        setShowAuth(true);
      } finally {
        setAuthChecking(false);
      }
    };

    run();
  }, []);

  // Cálculo de horário aberto/fechado
  const isOpenNow = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const diasPermitidos = [3, 4, 5, 6]; // qua, qui, sex, sab
    return diasPermitidos.includes(day) && hour >= 18 && hour < 22;
  }, []);

  if (authChecking) return null;

  return (
    <>
      {/* HEADER */}
      <header className="w-full mb-8 relative">
        <div className="w-full h-48 md:h-72 lg:h-80 relative">
          <Image src="/banner.png" alt="Banner" fill className="object-cover" />
        </div>
        <div className="bg-white flex flex-col items-center py-5">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md -mt-12">
            <Image
              src="/logo_melina.jpg"
              alt="Logo"
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-bold mt-3 text-[#a89050]">
            Melina Sushi
          </h2>
          <p className="text-gray-500 text-sm text-center">
            Delivery artesanal com amor e sabor 🍣
          </p>

          <div className="mt-1 text-sm font-medium">
            {isOpenNow ? (
              <span className="text-green-600">🟢 Aberto</span>
            ) : (
              <span className="text-red-600">🔴 Fechado</span>
            )}
            <span className="text-gray-600 ml-2">• 18h às 22h</span>
          </div>
        </div>
      </header>

      {/* MENU */}
      <main className="max-w-5xl mx-auto py-8 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-[#a89050]">Cardápio</h1>

        {["Pratos Quentes", "Pratos Crus", "Combos"].map((category) => (
          <section key={category} className="mb-10 w-full">
            <h2 className="text-2xl font-bold mb-4 text-[#a89050]">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products
                .filter((p) => p.category === category)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={addToCart}
                    onOpenCombo={setSelectedCombo}
                  />
                ))}
            </div>
          </section>
        ))}
      </main>

      {/* Botão do Carrinho */}
      <FloatingCartButton cart={cart} onClick={() => setCartOpen(true)} />

      {/* Carrinho Drawer */}
      <CartDrawer
        cart={cart}
        total={total}
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onDecrease={decreaseFromCart}
      />

      {/* Combo Modal */}
      {selectedCombo && (
        <ComboModal
          combo={selectedCombo}
          onClose={() => setSelectedCombo(null)}
          onConfirm={(items, totalCombo) => {
            addToCart({
              id: Date.now(),
              name: "Combo Personalizado 🍱",
              description: items
                .map((i) => `${i.quantity}x ${i.name}`)
                .join("\n"),
              image: "/combo.jpg",
              category: "Combos",
              price: totalCombo,
            });
            setSelectedCombo(null);
          }}
        />
      )}

      {/* Modal de Autenticação */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
