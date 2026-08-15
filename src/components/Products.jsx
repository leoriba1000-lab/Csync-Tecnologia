import { Cpu, MessageCircle, BarChart3, Workflow, ArrowUpRight } from "lucide-react";
import useReveal from "../hooks/useReveal";

const DESTAQUES = [
  { icon: Cpu, text: "Sistema de locação completo" },
  { icon: Workflow, text: "Site próprio para cada loja" },
  { icon: MessageCircle, text: "Atendimento por IA no WhatsApp e Instagram" },
  { icon: BarChart3, text: "Central de Leads e agendamentos" },
];

export default function Products() {
  const ref = useReveal();
  return (
    <section className="border-y border-ink-line bg-ink-panel/40 py-20 md:py-28">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-5 md:px-8">
        <span className="eyebrow text-sync-cyan">Produtos</span>

        <div className="mt-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight">
              O <span className="text-gradient">Vestia</span> é feito pela Csync
            </h2>
            <p className="mt-5 text-mist-muted leading-relaxed max-w-lg">
              Uma plataforma completa de gestão e atendimento por inteligência artificial
              para lojas de aluguel de roupas para eventos — sistema de locação, site
              próprio e uma IA que conversa com o cliente pelo WhatsApp e Instagram, do
              primeiro contato ao contrato assinado.
            </p>
            <a
              href="https://vestia.net.br"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-ink-line px-5 py-2.5 text-sm font-medium text-mist hover:border-sync-cyan/60 hover:text-white transition-colors"
            >
              Conhecer o Vestia
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {DESTAQUES.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="rounded-xl border border-ink-line bg-ink/60 p-5 flex items-start gap-3"
              >
                <Icon size={18} className="text-sync-cyan mt-0.5 shrink-0" strokeWidth={1.8} />
                <span className="text-sm text-mist-muted leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
