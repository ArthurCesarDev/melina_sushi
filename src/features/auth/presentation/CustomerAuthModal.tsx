"use client";
import { useState } from "react";
import { loginUser } from "@/features/auth/data/customer-auth-service";
import { getErrorMessage } from "@/core/errors/get-error-message";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { motion } from "framer-motion";

type CustomerAuthModalProps = {
  onClose: () => void;
};

export default function CustomerAuthModal({ onClose }: CustomerAuthModalProps) {
  const [name, setName] = useState("");
  const [rawPhone, setRawPhone] = useState("");
  const displayPhone = formatPhoneNumber(rawPhone);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!name.trim() || rawPhone.length < 10) {
      alert("Preencha nome e telefone válido");
      return;
    }

    setLoading(true);
    try {
      await loginUser(name, rawPhone);
      onClose(); 
    } catch (error: unknown) {
      alert(getErrorMessage(error, "Erro ao autenticar"));
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    setRawPhone(value.replace(/\D/g, "").slice(0, 11));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 15 }}
        className="relative rounded-2xl p-8 w-[90%] max-w-[400px] shadow-2xl 
             border border-[#FF5722]
             bg-white text-gray-900
             dark:bg-gray-900 dark:text-gray-100"
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        {/* Cabeçalho */}
        <div className="text-center mb-5">
          <h3 className="text-2xl font-bold text-[#FF5722]">
            Bem-vindo de volta
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Sentimos sua falta! Faça login para continuar sua experiência 🍣
          </p>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-[#FF5722] 
             p-3 rounded-lg
             bg-white text-gray-900
             dark:bg-gray-800 dark:text-gray-100
             placeholder:text-gray-400 dark:placeholder:text-gray-500
             focus:ring-2 focus:ring-[#FF5722]/50 outline-none transition-all"
          />

          <input
            placeholder="(11) 98765-4321"
            value={displayPhone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            maxLength={15}
            className="border border-[#FF5722] 
             p-3 rounded-lg
             bg-white text-gray-900
             dark:bg-gray-800 dark:text-gray-100
             placeholder:text-gray-400 dark:placeholder:text-gray-500
             focus:ring-2 focus:ring-[#FF5722]/50 outline-none transition-all"
          />

          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            onClick={handleLogin}
            className="bg-gradient-to-r from-[#FF5722] to-[#FFC107] text-white w-full py-3 rounded-xl mt-2 font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar agora"}
          </motion.button>
        </div>

        {/* Rodapé */}
        <p className="text-xs text-center text-gray-400 mt-4">
          Seus dados são protegidos 🔒 — não compartilhamos com ninguém.
        </p>
      </motion.div>
    </div>
  );
}
