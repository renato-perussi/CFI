import { useState } from 'react';
import type { ComparacaoFinanciamento as ComparacaoType } from '../../types/financing';
import { TabelaAmortizacao } from './AmortizationTable';
import { BotaoExportarCSV } from './ExportCSVButton';

interface AbasTabelasProps {
  dados: ComparacaoType;
}

/** Abas SAC/Price com as tabelas de amortização e o botão de exportar CSV. */
export function AbasTabelas({ dados }: AbasTabelasProps) {
  const [abaAtiva, setAbaAtiva] = useState<'SAC' | 'PRICE'>('SAC');

  return (
    <section aria-label="Tabelas de amortização" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-neutral-50 p-3 rounded-2xl border border-stone-200">
        <div
          className="grid grid-cols-2 sm:flex bg-stone-200/70 p-1 rounded-xl gap-1"
          role="tablist"
          aria-label="Selecionar tabela de amortização"
        >
          <button
            type="button"
            id="tab-tabela-sac"
            role="tab"
            aria-selected={abaAtiva === 'SAC'}
            aria-controls="painel-tabela-sac"
            onClick={() => setAbaAtiva('SAC')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              abaAtiva === 'SAC'
                ? 'bg-stone-900 text-[#c1ff72] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tabela SAC
          </button>
          <button
            type="button"
            id="tab-tabela-price"
            role="tab"
            aria-selected={abaAtiva === 'PRICE'}
            aria-controls="painel-tabela-price"
            onClick={() => setAbaAtiva('PRICE')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              abaAtiva === 'PRICE'
                ? 'bg-[#002f43] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tabela Price
          </button>
        </div>

        <BotaoExportarCSV
          dadosSAC={dados.resultadoSAC.tabela}
          dadosPrice={dados.resultadoPrice.tabela}
        />
      </div>

      {abaAtiva === 'SAC' ? (
        <div
          key="sac-table"
          id="painel-tabela-sac"
          role="tabpanel"
          aria-labelledby="tab-tabela-sac"
          className="animate-fadeIn"
        >
          <TabelaAmortizacao
            titulo="SAC — Tabela de Amortização"
            dados={dados.resultadoSAC.tabela}
          />
        </div>
      ) : (
        <div
          key="price-table"
          id="painel-tabela-price"
          role="tabpanel"
          aria-labelledby="tab-tabela-price"
          className="animate-fadeIn"
        >
          <TabelaAmortizacao
            titulo="Price — Tabela de Amortização"
            dados={dados.resultadoPrice.tabela}
          />
        </div>
      )}
    </section>
  );
}
