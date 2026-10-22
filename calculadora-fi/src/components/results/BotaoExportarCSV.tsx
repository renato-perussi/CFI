import type { Parcela } from '../../types/financiamento';
import { gerarCSVCompleto } from '../../utils/csv';
import { downloadCSV } from '../../utils/csvDownload';

interface BotaoExportarCSVProps {
  dadosSAC: Parcela[];
  dadosPrice: Parcela[];
}

export function BotaoExportarCSV({ dadosSAC, dadosPrice }: BotaoExportarCSVProps) {
  const handleExportar = () => {
    const csv = gerarCSVCompleto(dadosSAC, dadosPrice);
    const data = new Date();
    const nomeArquivo = `financiamento_${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}.csv`;
    downloadCSV(csv, nomeArquivo);
  };

  return (
    <button
      type="button"
      onClick={handleExportar}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 transition-all duration-200 cursor-pointer shrink-0"
      aria-label="Exportar tabelas em CSV"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-slate-500 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Exportar CSV
    </button>
  );
}
