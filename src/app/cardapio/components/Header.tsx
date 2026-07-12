"use client";
import { useMemo } from "react";
import { businessHoursSummary, isStoreOpenAt } from "@/config/businessHours";

export default function Header() {
  const isOpen = useMemo(() => {
    return isStoreOpenAt();
  }, []);

  return (
    <header className="w-full mb-8 relative">
      <div className="relative w-full h-48 md:h-72 lg:h-80">
        <img src="/banner.png" alt="Banner Melina Sushi" className="w-full h-full object-cover" />
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] flex flex-col items-center py-5 border-t border-gray-200 dark:border-gray-700 relative z-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md -mt-12 bg-white relative z-20">
          <img src="/logo_melina.jpg" alt="Logo Melina Sushi" className="w-full h-full object-cover" />
        </div>

        <h2 className="text-2xl font-bold mt-3 text-[#a89050]">Melina Sushi</h2>
        <p className="text-gray-500 text-sm text-center">Delivery artesanal com amor e sabor 🍣</p>
        <div className="mt-1 text-sm font-medium">
          {isOpen ? (
            <span className="text-green-600">🟢 Aberto</span>
          ) : (
            <span className="text-red-600">🔴 Fechado</span>
          )}
          <span className="text-gray-600 ml-2">• {businessHoursSummary}</span>
        </div>
      </div>
    </header>
  );
}
