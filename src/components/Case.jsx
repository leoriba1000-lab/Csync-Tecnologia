import useReveal from "../hooks/useReveal";

export default function Case() {
  const ref = useReveal();
  return (
    <section id="case" className="bg-white text-ink py-24 md:py-28">
      <div ref={ref} className="reveal max-w-3xl mx-auto px-5 md:px-8 text-center">
        <span className="eyebrow text-sync-blue">Case</span>

        <blockquote className="mt-8">
          <p className="font-display text-xl md:text-2xl leading-relaxed text-ink">
            “A Csync nos ajudou a organizar duas áreas fundamentais para o nosso
            negócio: a gestão das locações e o atendimento aos clientes.
          </p>
          <p className="mt-5 font-display text-xl md:text-2xl leading-relaxed text-ink">
            Com o sistema Vestia, conseguimos ter mais controle sobre contratos,
            clientes e toda a operação da loja. E, com a inteligência artificial
            no atendimento, passamos a dar uma resposta inicial muito mais
            rápida, entendendo o que o cliente procura e direcionando melhor
            cada atendimento.
          </p>
          <p className="mt-5 font-display text-xl md:text-2xl leading-relaxed text-ink">
            Hoje temos mais organização nos processos e uma visão mais clara
            dos nossos leads e agendamentos. A tecnologia deixou de ser apenas
            uma ferramenta e passou a fazer parte da operação da Fiore di
            Festa.”
          </p>
        </blockquote>

        <footer className="mt-8">
          <p className="font-display font-semibold text-lg text-ink">Fiore di Festa</p>
          <p className="text-sm text-slate-500">Moda para festas e locação de trajes</p>
        </footer>
      </div>
    </section>
  );
}
