interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (pagina: number) => void;
}

export function Paginacao({ paginaAtual, totalPaginas, onPaginaChange }: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
      <button
        type="button"
        onClick={() => onPaginaChange(paginaAtual - 1)}
        disabled={paginaAtual <= 1}
        className="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 hover:bg-gray-200 bg-gray-100"
        aria-label="Página anterior"
      >
        ← Anterior
      </button>

      <span className="text-sm text-gray-600" aria-live="polite">
        Página {paginaAtual} de {totalPaginas}
      </span>

      <button
        type="button"
        onClick={() => onPaginaChange(paginaAtual + 1)}
        disabled={paginaAtual >= totalPaginas}
        className="px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 hover:bg-gray-200 bg-gray-100"
        aria-label="Próxima página"
      >
        Próximo →
      </button>
    </div>
  );
}
