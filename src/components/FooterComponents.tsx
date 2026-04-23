export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]">
      {/* FUNDO FULL */}
      <div className="w-full px-4 py-10">
        {/* CONTEÚDO CENTRAL */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* ESQUERDA */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                  🍣
                </span>
                <div>
                  <p className="text-lg font-semibold text-white">
                    Melina Sushi
                  </p>
                  <p className="text-sm text-gray-400">
                    Delivery com amor e sabor
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-300 flex items-start gap-2">
                📍 Rua Manoel Soares de Oliveira 51 — Itacolomi, São Paulo/SP
              </p>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Atendimento: Esta semana (Qua e Qui) • 19h às 22h
              </span>
            </div>

            {/* DIREITA */}
            <div className="flex flex-col md:items-end gap-4">
              <p className="text-sm text-gray-400">
                Desenvolvido por{" "}
                <a
                  href="https://codicedeli.com.br"
                  target="_blank"
                  className="text-[#a89050] hover:text-[#c7b06a] font-semibold transition"
                >
                  Códice D’Eli
                </a>
              </p>

              <div className="flex gap-3">
                <a className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition">
                  💬 WhatsApp
                </a>
                <a className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition">
                  📷 Instagram
                </a>
              </div>
            </div>
          </div>

          {/* LINHA FINAL */}
          <div className="mt-8 pt-4 border-t border-white/10 text-xs text-gray-500">
            © {new Date().getFullYear()} Melina Sushi. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
