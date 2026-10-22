import type { AbaEducacao } from './content';

interface AbasEducacaoProps {
  abaAtiva: AbaEducacao;
  onMudarAba: (aba: AbaEducacao) => void;
}

/** Tablist SAC / Price / Comparação do guia educativo. */
export function AbasEducacao({ abaAtiva, onMudarAba }: AbasEducacaoProps) {
  return (
    <div
      className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-xl"
      role="tablist"
      aria-label="Conteúdo educativo"
    >
      <button
        type="button"
        id="tab-sac"
        role="tab"
        aria-selected={abaAtiva === 'sac'}
        aria-controls="painel-sac"
        onClick={() => onMudarAba('sac')}
        className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
          abaAtiva === 'sac'
            ? 'bg-white text-emerald-700 shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        SAC
      </button>
      <button
        type="button"
        id="tab-price"
        role="tab"
        aria-selected={abaAtiva === 'price'}
        aria-controls="painel-price"
        onClick={() => onMudarAba('price')}
        className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
          abaAtiva === 'price'
            ? 'bg-white text-blue-700 shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        Price
      </button>
      <button
        type="button"
        id="tab-comparacao"
        role="tab"
        aria-selected={abaAtiva === 'comparacao'}
        aria-controls="painel-comparacao"
        onClick={() => onMudarAba('comparacao')}
        className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
          abaAtiva === 'comparacao'
            ? 'bg-white text-slate-900 shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        Comparação
      </button>
    </div>
  );
}
