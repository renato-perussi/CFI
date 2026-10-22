export function Header() {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-slate-700/80 flex items-center justify-center shrink-0 shadow-inner"
            aria-hidden="true"
          >
            <svg
              className="w-5 h-5 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5.5v-5.5a1 1 0 00-1-1h-3a1 1 0 00-1 1V21H4a1 1 0 01-1-1v-9.5z"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                CFI
              </span>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Calculadora de Financiamento Imobiliário
              </h1>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Compare SAC e Price e encontre a melhor opção para o seu imóvel
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 bg-slate-800/70 border border-slate-700/60 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          <span>Simulação instantânea · 100% gratuita</span>
        </div>
      </div>
    </header>
  );
}
