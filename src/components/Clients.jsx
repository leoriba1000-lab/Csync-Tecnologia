const PLACEHOLDERS = ["Empresa A", "Empresa B", "Empresa C", "Empresa D", "Empresa E"];

export default function Clients() {
  return (
    <section className="border-y border-ink-line bg-ink-panel/40">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row items-center gap-6 md:gap-12">
        <p className="text-sm text-mist-faint whitespace-nowrap font-medium">
          Empresas que já evoluíram com a Csync
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-x-10 gap-y-4 opacity-70">
          {PLACEHOLDERS.map((name) => (
            <span
              key={name}
              className="font-display text-lg text-mist-faint grayscale select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
