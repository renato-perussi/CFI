interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (pagina: number) => void;
}

export function Paginacao({ paginaAtual, totalPaginas, onPaginaChange }: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3.5 border-t border-slate-200/80 bg-slate-50/70">
      <button
        type="button"
        onClick={() => onPaginaChange(paginaAtual - 1)}
        disabled={paginaAtual <= 1}
        className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
        aria-label="Página anterior"
      >
        ← Anterior
      </button>

      <span
        className="text-xs sm:text-sm font-medium text-slate-600 tabular-nums whitespace-nowrap"
        aria-live="polite"
      >
        Página {paginaAtual} de {totalPaginas}
      </span>

      <button
        type="button"
        onClick={() => onPaginaChange(paginaAtual + 1)}
        disabled={paginaAtual >= totalPaginas}
        className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
        aria-label="Próxima página"
      >
        Próximo →
      </button>
    </div>
  );
}
