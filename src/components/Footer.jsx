import { MessageCircle } from "lucide-react";
import Logo from "./Logo";

const SOLUTIONS_LINKS = [
  "IAs de Atendimento",
  "Sistemas Inteligentes",
  "Automação de Processos",
  "Integrações",
];

const INSTITUTIONAL_LINKS = [
  { label: "Vestia", href: "#sobre" },
  { label: "Case", href: "#case" },
  { label: "Blog", href: "/blog.html" },
  { label: "Trabalhe conosco", href: "mailto:contato@csync.com.br?subject=Trabalhe%20conosco" },
  { label: "Política de Privacidade", href: "/privacidade.html" },
  { label: "Termos de Uso", href: "/termos-de-uso.html" },
];

export default function Footer() {
  return (
    <footer id="contato" className="bg-ink border-t border-ink-line">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-mist-faint leading-relaxed max-w-[240px]">
              Desenvolvemos inteligência artificial e sistemas que conectam
              ideias e criam soluções para empresas que querem evoluir.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://wa.me/5585992697280"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Csync"
                className="h-9 w-9 rounded-full border border-ink-line flex items-center justify-center text-mist-faint hover:text-white hover:border-sync-cyan/60 transition-colors"
              >
                <MessageCircle size={15} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="eyebrow text-mist-faint mb-4">Soluções</h4>
            <ul className="flex flex-col gap-2.5">
              {SOLUTIONS_LINKS.map((l) => (
                <li key={l}>
                  <a href="#solucoes" className="text-sm text-mist-muted hover:text-mist transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-mist-faint mb-4">Institucional</h4>
            <ul className="flex flex-col gap-2.5">
              {INSTITUTIONAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-mist-muted hover:text-mist transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-mist-faint mb-4">Contato</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-mist-muted">
              <li>contato@csync.com.br</li>
              <li>(85) 99269-7280</li>
              <li>Rua dos Mandacarus, 501, 1406 B — Passaré, Fortaleza/CE</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-ink-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mist-faint">
          <p>© {new Date().getFullYear()} Csync Tecnologia. Todos os direitos reservados.</p>
          <p className="font-mono">CNPJ 68.542.808/0001-34</p>
        </div>
      </div>
    </footer>
  );
}
