import { useState } from 'react';
import type { AbaEducacao } from './conteudo';
import { AbasEducacao } from './AbasEducacao';
import { PainelSistema } from './PainelSistema';
import { TabelaComparativa } from './TabelaComparativa';

/** Guia de decisão SAC vs Price (orquestra abas e painéis). */
export function ConteudoEducativo() {
  const [abaAtiva, setAbaAtiva] = useState<AbaEducacao>('sac');

  return (
    <section className="pt-4" aria-labelledby="educacao-titulo">
      <div className="mb-5">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
          Guia de Decisão
        </span>
        <h2 id="educacao-titulo" className="text-xl sm:text-2xl font-bold text-slate-900">
          Entenda os Sistemas de Financiamento
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Conheça as diferenças estruturais entre SAC e Price para tomar a melhor decisão.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden">
        <div className="p-2 sm:p-3 bg-slate-50 border-b border-slate-200/80">
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
