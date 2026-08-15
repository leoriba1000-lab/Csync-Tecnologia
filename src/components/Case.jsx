import useReveal from "../hooks/useReveal";

export default function Case() {
  const ref = useReveal();
  return (
    <section id="case" className="bg-slate-50 text-ink py-24 md:py-28">
      <div ref={ref} className="reveal max-w-4xl mx-auto px-5 md:px-8">
        <span className="eyebrow text-sync-blue">Case</span>

        <div className="mt-6 rounded-3xl bg-white border border-slate-200 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_30px_60px_-30px_rgba(15,23,42,0.18)] p-8 md:p-12">
          <span
            aria-hidden="true"
            className="text-gradient font-display text-6xl md:text-7xl leading-none select-none"
          >
            “
          </span>

          <blockquote className="mt-2 max-w-2xl">
            <p className="font-display text-lg md:text-xl leading-relaxed text-ink">
              A Csync nos ajudou a organizar duas áreas fundamentais para o
              nosso negócio: a gestão das locações e o atendimento aos
              clientes.
            </p>
            <p className="mt-4 font-display text-lg md:text-xl leading-relaxed text-ink">
              Com o sistema Vestia, conseguimos ter mais controle sobre
              contratos, clientes e toda a operação da loja. E, com a
              inteligência artificial no atendimento, passamos a dar uma
              resposta inicial muito mais rápida, entendendo o que o cliente
              procura e direcionando melhor cada atendimento.
            </p>
            <p className="mt-4 font-display text-lg md:text-xl leading-relaxed text-ink">
              Hoje temos mais organização nos processos e uma visão mais
              clara dos nossos leads e agendamentos. A tecnologia deixou de
              ser apenas uma ferramenta e passou a fazer parte da operação
              da Fiore di Festa.
            </p>
          </blockquote>

          <footer className="mt-8 flex items-center gap-4">
            <div className="h-11 w-11 shrink-0 rounded-full bg-sync-gradient flex items-center justify-center font-display font-semibold text-sm text-white">
              FF
            </div>
            <div>
              <p className="font-display font-semibold text-base text-ink">Fiore di Festa</p>
              <p className="text-sm text-slate-500">Moda para festas e locação de trajes</p>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
