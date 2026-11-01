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
      <span className="text-stone-400 font-montserrat text-xs mr-0.5">Atalhos:</span>
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
            className={`px-2 py-0.5 rounded-md text-[11px] font-medium border transition-colors ${
              valorImovelNum <= 0
                ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                : ativo
                  ? 'bg-stone-900 text-[#c1ff72] border-stone-900 cursor-pointer'
                  : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200 hover:text-stone-900 cursor-pointer'
            }`}
          >
            {item.rotulo}
          </button>
        );
      })}
    </div>
  );
}
