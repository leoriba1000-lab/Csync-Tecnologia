import { ArrowRight } from "lucide-react";
import useReveal from "../hooks/useReveal";

export default function CTA() {
  const ref = useReveal();
  return (
    <section className="relative overflow-hidden bg-ink-panel border-y border-ink-line">
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-sync-gradient-soft blur-3xl opacity-50"
        aria-hidden="true"
      />
      <div
        ref={ref}
        className="reveal relative max-w-3xl mx-auto px-5 md:px-8 py-24 md:py-28 text-center"
      >
        <h2 className="font-display font-semibold text-3xl md:text-[2.6rem] leading-tight tracking-tight">
          Pronto para evoluir com{" "}
          <span className="text-gradient">tecnologia?</span>
        </h2>
        <p className="mt-5 text-mist-muted text-lg max-w-xl mx-auto">
          Fale com nosso time e descubra como podemos transformar seu
          atendimento e seus resultados.
        </p>
        <a
          href="#contato"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-sync-gradient px-8 py-4 text-sm font-medium text-white shadow-glow hover:brightness-110 transition-all"
        >
          Falar com um especialista
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
