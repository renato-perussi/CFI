export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-800 text-emerald-400 font-bold text-xs border border-slate-700">
            CFI
          </span>
          <p className="text-slate-300 font-medium">
            Calculadora de Financiamento Imobiliário &copy; {new Date().getFullYear()}
          </p>
        </div>
        <p className="text-slate-400 text-center sm:text-right max-w-md">
          Ferramenta educativa de simulação (SAC e Tabela Price). Consulte sua instituição
          financeira para taxas efetivas, seguros e tarifas operacionais.
        </p>
      </div>
    </footer>
  );
}
