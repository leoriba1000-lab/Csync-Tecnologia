import { Bot, Cpu, Workflow, BarChart3, ArrowUpRight } from "lucide-react";
import useReveal from "../hooks/useReveal";

const SOLUTIONS = [
  {
    icon: Bot,
    title: "IA de Atendimento",
    text: "Atendentes virtuais inteligentes que conversam, entendem e resolvem. Mais agilidade, disponibilidade 24/7 e melhor experiência.",
  },
  {
    icon: Cpu,
    title: "Sistemas Inteligentes",
    text: "Soluções personalizadas que organizam informações, automatizam processos e tornam sua operação mais eficiente.",
  },
  {
    icon: Workflow,
    title: "Automação de Processos",
    text: "Automatize tarefas repetitivas, integre sistemas e reduza custos operacionais.",
  },
  {
    icon: BarChart3,
    title: "Dados e Inteligência",
    text: "Transformamos dados em informações úteis para decisões mais assertivas e crescimento sustentável.",
  },
];

function Card({ icon: Icon, title, text, index }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal group relative rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(59,107,255,0.35)] hover:border-transparent"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="h-12 w-12 rounded-xl bg-sync-gradient-soft flex items-center justify-center">
        <Icon size={22} className="text-sync-blue" strokeWidth={1.8} />
      </div>
      <h3 className="mt-6 font-display font-semibold text-lg text-ink">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">{text}</p>
      <ArrowUpRight
        size={18}
        className="absolute top-7 right-7 text-slate-300 transition-all duration-300 group-hover:text-sync-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </div>
  );
}

export default function Solutions() {
  const headRef = useReveal();
  return (
    <section id="solucoes" className="bg-white text-ink py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div ref={headRef} className="reveal max-w-xl">
          <span className="eyebrow text-sync-blue">Soluções</span>
          <h2 className="mt-4 font-display font-semibold text-3xl md:text-4xl tracking-tight text-ink">
            Tecnologia completa para impulsionar seu negócio
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SOLUTIONS.map((s, i) => (
            <Card key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
