export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pb-8 mt-12 w-full">
      <div className="border rounded-3xl p-8 lg:p-12 shadow-sm bg-neutral-50 border-stone-200">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 justify-between">
          <div className="lg:w-1/3 space-y-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#c1ff72] border border-[#aae65f] text-stone-900 font-bold text-xs">
                CFI
              </span>
              <span className="text-2xl font-bold tracking-tighter font-google-sans-flex text-stone-900">
                CFI<span className="text-lime-500">.</span>
              </span>
            </div>
            <p className="text-sm text-stone-500 font-montserrat max-w-sm leading-relaxed">
              Calculadora de Financiamento Imobiliário — compare SAC e Price e encontre a melhor
              opção para o seu imóvel.
            </p>
          </div>

          <nav className="flex flex-wrap gap-10 lg:gap-20 text-sm" aria-label="Navegação do rodapé">
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-semibold tracking-wider text-stone-400">
                Simulador
              </h3>
              <ul className="space-y-3 text-stone-600">
                <li>
                  <a href="#simulador" className="hover:text-stone-900 transition-colors">
                    Simular
                  </a>
                </li>
                <li>
                  <a href="#resultados" className="hover:text-stone-900 transition-colors">
                    Resultados
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-semibold tracking-wider text-stone-400">
                Aprender
              </h3>
              <ul className="space-y-3 text-stone-600">
                <li>
                  <a href="#educativo" className="hover:text-stone-900 transition-colors">
                    Guia de Decisão
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs border-stone-200 text-stone-400">
          <p>Calculadora de Financiamento Imobiliário &copy; {ano}</p>
          <p className="text-center md:text-right max-w-md">
            Ferramenta educativa de simulação (SAC e Tabela Price). Consulte sua instituição
            financeira para taxas efetivas, seguros e tarifas operacionais.
          </p>
        </div>
      </div>
    </footer>
  );
}
