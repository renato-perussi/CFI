import { useState } from 'react';
import type { AbaEducacao } from './content';
import { AbasEducacao } from './EducationTabs';
import { PainelSistema } from './SystemPanel';
import { TabelaComparativa } from './ComparisonTable';

/** Guia de decisão SAC vs Price (orquestra abas e painéis). */
export function ConteudoEducativo() {
  const [abaAtiva, setAbaAtiva] = useState<AbaEducacao>('sac');

  return (
    <section className="pt-4" aria-labelledby="educacao-titulo">
      <div className="mb-5">
        <span className="font-semibold text-xs tracking-widest uppercase mb-3 block text-stone-900 bg-stone-100 w-fit px-3 py-1.5 rounded">
          Guia de Decisão
        </span>
        <h2
          id="educacao-titulo"
          className="font-montserrat text-2xl sm:text-3xl font-medium text-stone-900 tracking-tight"
        >
          Entenda os Sistemas de Financiamento
        </h2>
        <p className="text-sm sm:text-base text-stone-500 mt-1 font-montserrat">
          Conheça as diferenças estruturais entre SAC e Price para tomar a melhor decisão.
        </p>
      </div>

      <div className="bg-white rounded-[32px] border border-stone-200 overflow-hidden">
        <div className="p-2 sm:p-3 bg-neutral-50 border-b border-stone-200">
          <AbasEducacao abaAtiva={abaAtiva} onMudarAba={setAbaAtiva} />
        </div>

        <div className="p-5 sm:p-8">
          <div key={abaAtiva} className="animate-fadeIn">
            {abaAtiva === 'sac' && <PainelSistema variante="sac" />}
            {abaAtiva === 'price' && <PainelSistema variante="price" />}
            {abaAtiva === 'comparacao' && <TabelaComparativa />}
          </div>
        </div>
      </div>
    </section>
  );
}
