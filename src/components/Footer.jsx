import { MessageCircle } from "lucide-react";
import Logo from "./Logo";

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" />
      <circle cx="7.5" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 16.5v-3.6c0-1.4 1-2.1 2.1-2.1 1.1 0 1.9.8 1.9 2.1v3.6" />
      <line x1="11.5" y1="10.5" x2="11.5" y2="16.5" />
    </svg>
  );
}

const SOLUTIONS_LINKS = [
  "IAs de Atendimento",
  "Sistemas Inteligentes",
  "Automação de Processos",
  "Integrações",
];

const INSTITUTIONAL_LINKS = ["Produtos", "Cases", "Blog", "Trabalhe conosco"];

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
              {[
                { Icon: InstagramIcon, label: "Instagram da Csync", href: "#" },
                { Icon: LinkedinIcon, label: "LinkedIn da Csync", href: "#" },
                { Icon: MessageCircle, label: "WhatsApp da Csync", href: "https://wa.me/5585992697280" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="h-9 w-9 rounded-full border border-ink-line flex items-center justify-center text-mist-faint hover:text-white hover:border-sync-cyan/60 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
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
              {INSTITUTIONAL_LINKS.map((l) => (
                <li key={l}>
                  <a href="#sobre" className="text-sm text-mist-muted hover:text-mist transition-colors">
                    {l}
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
              <li>Rua dos Mandacarus, 501, ap. 1406-B — Passaré, Fortaleza/CE</li>
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
