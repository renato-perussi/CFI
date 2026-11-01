export function Header() {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-stone-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between gap-4">
        <a
          href="#simulador"
          className="flex items-center gap-3 shrink-0"
          aria-label="CFI — Voltar ao simulador"
        >
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#c1ff72] border border-[#aae65f] text-stone-900 font-bold text-sm">
            CFI
          </span>
          <span className="hidden sm:block">
            <span className="block font-google-sans-flex text-2xl lg:text-3xl font-semibold tracking-tighter text-stone-900 leading-none">
              CFI
            </span>
            <span className="block text-[11px] font-montserrat font-medium text-stone-500 mt-0.5">
              Financiamento Imobiliário
            </span>
          </span>
        </a>

        <nav
          className="hidden md:flex items-center gap-8 font-montserrat"
          aria-label="Navegação principal"
        >
          <a
            href="#simulador"
            className="font-montserrat text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            Simulador
          </a>
          <a
            href="#resultados"
            className="font-montserrat text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            Resultados
          </a>
          <a
            href="#educativo"
            className="font-montserrat text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            Guia
          </a>
        </nav>

        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium bg-white border-stone-200 text-stone-600">
          <span className="w-2 h-2 rounded-full bg-[#c1ff72] animate-pulse" aria-hidden="true" />
          <span>Simulação instantânea · 100% gratuita</span>
        </div>
      </div>
    </header>
  );
}
