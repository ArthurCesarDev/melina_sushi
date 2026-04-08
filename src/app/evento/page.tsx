'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, UtensilsCrossed, Flame, Fish, Users, Send } from 'lucide-react';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyEQZrJFggy3F_Y6V84CmcymsBsvYYH9gSzyOogkEDqM2YSnb9iSoL2fIAjaNz38oo5sA/exec';

type Option = 'Pratos crus' | 'Pratos quentes' | 'Os 2';

const options: {
  title: Option;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    title: 'Pratos crus',
    description: 'Para quem prefere opções leves e frescas.',
    icon: <Fish className="w-6 h-6" />,
  },
  {
    title: 'Pratos quentes',
    description: 'Para quem gosta de pratos quentinhos e saborosos.',
    icon: <Flame className="w-6 h-6" />,
  },
  {
    title: 'Os 2',
    description: 'Para quem gosta de experimentar um pouco de tudo.',
    icon: <UtensilsCrossed className="w-6 h-6" />,
  },
];

export default function EventoPage() {
  const [nome, setNome] = useState('');
  const [preferencia, setPreferencia] = useState<Option | ''>('');
  const [pessoas, setPessoas] = useState('1');
  const [observacao, setObservacao] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!nome.trim()) {
      setError('Informe seu nome.');
      return;
    }

    if (!preferencia) {
      setError('Escolha uma preferência de prato.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          nome,
          preferencia,
          pessoas,
          observacao,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Erro ao enviar');
      }

      setSuccess(true);
      setNome('');
      setPreferencia('');
      setPessoas('1');
      setObservacao('');
    } catch (err) {
      console.error(err);
      setError('Não foi possível enviar agora. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,144,80,0.22),_transparent_40%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0b0b0b]" />

        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#a89050]/30 bg-[#a89050]/10 px-4 py-1 text-sm text-[#e7d29c]">
              Evento Especial
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight">
              Escolha sua
              <span className="block text-[#a89050]">preferência de pratos</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
              Queremos organizar tudo com carinho e evitar excesso de comida. Preencha seu nome,
              escolha sua preferência e envie sua resposta.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-7 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#a89050]/15 border border-[#a89050]/20 flex items-center justify-center text-[#e7d29c]">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Formulário do evento</h2>
                <p className="text-sm text-gray-400">Leva menos de 1 minuto para responder</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Seu nome</label>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite seu nome"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#a89050]/60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-3">Escolha sua preferência</label>
                <div className="grid md:grid-cols-3 gap-4">
                  {options.map((item) => {
                    const active = preferencia === item.title;

                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => setPreferencia(item.title)}
                        className={`text-left rounded-2xl border p-4 transition-all ${
                          active
                            ? 'border-[#a89050] bg-[#a89050]/15 shadow-lg shadow-[#a89050]/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="w-11 h-11 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center text-[#e7d29c]">
                            {item.icon}
                          </div>
                          {active && <CheckCircle2 className="w-5 h-5 text-[#e7d29c]" />}
                        </div>
                        <h3 className="mt-4 font-bold text-lg">{item.title}</h3>
                        <p className="mt-1 text-sm text-gray-400 leading-relaxed">{item.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Quantas pessoas?</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      min="1"
                      value={pessoas}
                      onChange={(e) => setPessoas(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-black/30 pl-11 pr-4 py-3 text-white outline-none focus:border-[#a89050]/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Observação</label>
                  <input
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                    placeholder="Opcional"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#a89050]/60"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  Preferência enviada com sucesso. Obrigado!
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl px-5 py-3.5 font-semibold text-black bg-gradient-to-r from-[#a89050] to-[#e7d29c] hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Enviando...' : 'Enviar preferência'}
              </button>
            </form>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-5"
          >
            

            
          </motion.aside>
        </div>
      </main>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl border border-white/10 bg-[#121212] p-6 shadow-2xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center text-emerald-300 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="mt-4 text-center text-2xl font-bold">Tudo certo!</h3>
              <p className="mt-2 text-center text-gray-400">
                Sua preferência foi enviada para a organização do evento.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-6 w-full rounded-2xl px-4 py-3 font-semibold text-black bg-gradient-to-r from-[#a89050] to-[#e7d29c]"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}