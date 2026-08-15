import { ArrowRight, PlayCircle } from "lucide-react";
import useReveal from "../hooks/useReveal";

function SyncComposition() {
  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto">
      <svg
        viewBox="0 0 560 560"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="syncStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B6BFF" />
            <stop offset="50%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <radialGradient id="nodeGlowA" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGlowB" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* faint orbit rings */}
        <circle cx="280" cy="280" r="230" fill="none" stroke="#1B2440" strokeWidth="1" />
        <circle cx="280" cy="280" r="170" fill="none" stroke="#1B2440" strokeWidth="1" />

        {/* connecting path between the two nodes, echoing the S of the mark */}
        <path
          id="syncPath"
          d="M 165 190 C 260 190, 260 280, 165 280 C 70 280, 70 370, 165 370
             C 260 370, 320 370, 395 370"
          fill="none"
          stroke="url(#syncStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* traveling pulse along the path */}
        <circle r="5" fill="#F5F7FF">
          <animateMotion dur="4.5s" repeatCount="indefinite">
            <mpath href="#syncPath" />
          </animateMotion>
        </circle>

        {/* node A glow + hexagon */}
        <circle cx="165" cy="230" r="70" fill="url(#nodeGlowA)" className="animate-pulse-slow" />
        <polygon
          points="165,182 205,206 205,254 165,278 125,254 125,206"
          fill="#0A0F1F"
          stroke="url(#syncStroke)"
          strokeWidth="2"
          className="animate-drift-slow"
        />

        {/* node B glow + hexagon */}
        <circle cx="395" cy="370" r="80" fill="url(#nodeGlowB)" className="animate-pulse-slow" style={{ animationDelay: "1.4s" }} />
        <polygon
          points="395,318 440,344 440,396 395,422 350,396 350,344"
          fill="#0A0F1F"
          stroke="url(#syncStroke)"
          strokeWidth="2"
          className="animate-drift-slower"
        />

        {/* scattered data points */}
        {[
          [90, 120], [470, 150], [500, 260], [90, 440], [280, 480], [460, 460],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="2.5"
            fill="#8D96B3"
            opacity="0.5"
            className="animate-drift-slow"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Hero() {
  const revealRef = useReveal();
  const revealRef2 = useReveal();

  return (
    <section id="inicio" className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-sync-gradient-soft blur-3xl opacity-40"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div ref={revealRef} className="reveal">
          <span className="eyebrow text-sync-cyan">Tecnologia</span>
          <h1 className="mt-5 font-display font-semibold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight">
            Tecnologia que <span className="text-gradient">conecta.</span>
            <br />
            Soluções que <span className="text-gradient">transformam.</span>
          </h1>
          <p className="mt-6 text-mist-muted text-lg leading-relaxed max-w-lg">
            Desenvolvemos IAs de atendimento e sistemas inteligentes que automatizam
            processos, melhoram experiências e geram resultados.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <a
              href="#solucoes"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sync-gradient px-7 py-3.5 text-sm font-medium text-white shadow-glow hover:brightness-110 transition-all"
            >
              Conheça nossas soluções
              <ArrowRight size={16} />
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-line px-7 py-3.5 text-sm font-medium text-mist hover:border-sync-cyan/60 hover:text-white transition-colors"
            >
              <PlayCircle size={16} />
              Ver como funciona
            </a>
          </div>
        </div>

        <div className="reveal" ref={revealRef2}>
          <SyncComposition />
        </div>
      </div>
    </section>
  );
}
