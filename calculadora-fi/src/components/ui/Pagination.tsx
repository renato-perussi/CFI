interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (pagina: number) => void;
}

export function Paginacao({ paginaAtual, totalPaginas, onPaginaChange }: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3.5 border-t border-stone-200 bg-neutral-50">
      <button
        type="button"
        onClick={() => onPaginaChange(paginaAtual - 1)}
        disabled={paginaAtual <= 1}
        className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-stone-200 bg-white text-stone-800 hover:bg-stone-900 hover:text-[#c1ff72] hover:border-stone-900 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
        aria-label="Página anterior"
      >
        ← Anterior
      </button>

      <span
        className="text-xs sm:text-sm font-medium text-stone-600 tabular-nums whitespace-nowrap"
        aria-live="polite"
      >
        Página {paginaAtual} de {totalPaginas}
      </span>

      <button
        type="button"
        onClick={() => onPaginaChange(paginaAtual + 1)}
        disabled={paginaAtual >= totalPaginas}
        className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-stone-200 bg-white text-stone-800 hover:bg-stone-900 hover:text-[#c1ff72] hover:border-stone-900 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
        aria-label="Próxima página"
      >
        Próximo →
      </button>
    </div>
  );
}
