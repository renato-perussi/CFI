import { PRAZOS_SUGERIDOS } from '../../constants/business';

interface AtalhosPrazoProps {
  prazoMeses: string;
  onSelecionar: (meses: string) => void;
}

/** Atalhos de prazo (120/240/360/420 meses). */
export function AtalhosPrazo({ prazoMeses, onSelecionar }: AtalhosPrazoProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
      <span className="text-stone-400 font-montserrat text-xs mr-0.5">Atalhos:</span>
      {PRAZOS_SUGERIDOS.map((item) => {
        const ativo = prazoMeses === item.meses;
        return (
          <button
            key={item.meses}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelecionar(item.meses)}
            className={`px-2 py-0.5 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
              ativo
                ? 'bg-stone-900 text-[#c1ff72] border-stone-900'
                : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200 hover:text-stone-900'
            }`}
          >
            {item.rotulo}
          </button>
        );
      })}
    </div>
  );
}
