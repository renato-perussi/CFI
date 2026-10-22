import { ENTRADAS_SUGERIDAS } from '../../constants/business';

interface AtalhosEntradaProps {
  valorImovelNum: number;
  entradaNum: number;
  onSelecionar: (centavos: string) => void;
}

/** Atalhos de entrada (20/30/40/50% do valor do imóvel). */
export function AtalhosEntrada({ valorImovelNum, entradaNum, onSelecionar }: AtalhosEntradaProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
      <span className="text-slate-400 mr-0.5">Atalhos:</span>
      {ENTRADAS_SUGERIDAS.map((item) => {
        const valorAlvoCentavos =
          valorImovelNum > 0 ? Math.round(valorImovelNum * item.percentual) : 0;
        const ativo =
          valorImovelNum > 0 && Math.abs(Math.round(entradaNum * 100) - valorAlvoCentavos) <= 1;

        return (
          <button
            key={item.percentual}
            type="button"
            disabled={valorImovelNum <= 0}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              if (valorImovelNum > 0) {
                onSelecionar(String(valorAlvoCentavos));
              }
            }}
            className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
              valorImovelNum <= 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : ativo
                  ? 'bg-blue-600 text-white cursor-pointer'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer'
            }`}
          >
            {item.rotulo}
          </button>
        );
      })}
    </div>
  );
}
