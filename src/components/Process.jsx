import { Search, Sparkles, Rocket } from "lucide-react";
import useReveal from "../hooks/useReveal";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Entendemos seu desafio",
    text: "Analisamos seus processos e identificamos oportunidades de melhoria.",
  },
  {
    n: "02",
    icon: Sparkles,
    title: "Desenvolvemos a solução",
    text: "Criamos IAs e sistemas personalizados para atender suas necessidades.",
  },
  {
    n: "03",
    icon: Rocket,
    title: "Implantamos e evoluímos juntos",
    text: "Implementamos com suporte completo e evoluímos continuamente com você.",
  },
];

function Step({ step, index }) {
  const ref = useReveal();
  const Icon = step.icon;
  return (
    <li
      ref={ref}
      className="reveal relative flex gap-6 pb-10 last:pb-0"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className="relative z-10 flex-shrink-0 h-12 w-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
        <Icon size={19} className="text-sync-blue" strokeWidth={1.8} />
      </div>
      <div className="pt-1.5">
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono text-xs text-sync-purple/70">{step.n}</span>
          <h3 className="font-display font-semibold text-lg text-ink">
            {step.title}
          </h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 max-w-sm">
          {step.text}
        </p>
      </div>
    </li>
  );
}

export default function Process() {
  const headRef = useReveal();
  return (
    <div>
      <div ref={headRef} className="reveal">
        <span className="eyebrow text-sync-blue">Como funciona</span>
        <h2 className="mt-4 font-display font-semibold text-3xl md:text-4xl tracking-tight text-ink">
          Soluções que se adaptam ao seu negócio
        </h2>
      </div>

      <ol className="mt-12 relative">
        <div
          className="absolute left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-sync-blue via-sync-cyan to-sync-purple opacity-30"
          aria-hidden="true"
        />
        {STEPS.map((step, i) => (
          <Step key={step.n} step={step} index={i} />
        ))}
      </ol>
    </div>
  );
}
