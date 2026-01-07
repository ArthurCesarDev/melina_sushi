export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] text-gray-300 py-6 mt-10 border-t border-gray-700">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        {/* 📍 Endereço */}
        <div>
          <p className="text-sm">
            📍 <span className="font-semibold text-white">Melina Sushi</span><br />
            Rua Manoel Soares de Oliveira 51 — Itacolomi, São Paulo/SP<br />
            Atendimento: Qua a Sáb, 19h às 22h
          </p>
        </div>

        {/* 💻 Desenvolvido por */}
        <div className="text-sm mt-2 md:mt-0">
          Desenvolvido por{" "}
          <a
            href="https://codicedeli.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a89050] hover:underline font-medium"
          >
            Códice D’Eli
          </a>
        </div>
      </div>
    </footer>
  )
}
