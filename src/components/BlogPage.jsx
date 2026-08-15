import Logo from "./Logo";

// Lista de posts publicados. Vazia por enquanto — quando o primeiro post
// estiver escrito, ele entra aqui como { title, date, excerpt }.
const POSTS = [];

export default function BlogPage() {
  return (
    <div className="bg-ink text-mist min-h-screen font-body">
      <header className="border-b border-ink-line">
        <div className="max-w-3xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <a href="/" aria-label="Csync Tecnologia — início">
            <Logo />
          </a>
          <a href="/" className="text-sm text-mist-muted hover:text-mist transition-colors">
            ← Voltar para o site
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <span className="eyebrow text-sync-cyan">Blog</span>
        <h1 className="mt-5 font-display font-semibold text-3xl md:text-4xl tracking-tight">
          Ideias, bastidores e aprendizados da Csync
        </h1>

        {POSTS.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-ink-line bg-ink-panel/40 p-10 text-center">
            <p className="text-mist-muted leading-relaxed">
              Ainda não publicamos nenhum post — os primeiros textos estão a caminho.
            </p>
          </div>
        ) : (
          <div className="mt-14 flex flex-col gap-8">
            {POSTS.map((post) => (
              <article key={post.title} className="border-b border-ink-line pb-8">
                <time className="text-xs text-mist-faint">{post.date}</time>
                <h2 className="mt-2 font-display font-semibold text-xl">{post.title}</h2>
                <p className="mt-2 text-sm text-mist-muted leading-relaxed">{post.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-ink-line py-8">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center text-xs text-mist-faint">
          © {new Date().getFullYear()} Csync Tecnologia. CNPJ 68.542.808/0001-34.
        </div>
      </footer>
    </div>
  );
}
