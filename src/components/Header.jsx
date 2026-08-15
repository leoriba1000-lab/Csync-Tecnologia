import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV_ITEMS = [
  { label: "Início", href: "#inicio" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-xl border-b border-ink-line/80"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#inicio" aria-label="Csync Tecnologia — início">
          <Logo />
        </a>

        <nav className="hidden lg:flex items-center gap-9" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-mist-muted hover:text-mist transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="hidden lg:inline-flex items-center rounded-full bg-sync-gradient px-5 py-2.5 text-sm font-medium text-white shadow-glow hover:brightness-110 transition-all"
        >
          Fale conosco
        </a>

        <button
          className="lg:hidden text-mist p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-ink/98 backdrop-blur-xl border-b border-ink-line px-5 pb-6 pt-2">
          <nav className="flex flex-col gap-1" aria-label="Navegação mobile">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-mist-muted hover:text-mist border-b border-ink-line/60 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-sync-gradient px-5 py-3 text-sm font-medium text-white"
          >
            Fale conosco
          </a>
        </div>
      )}
    </header>
  );
}
