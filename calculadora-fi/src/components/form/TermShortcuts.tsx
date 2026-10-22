import { PRAZOS_SUGERIDOS } from '../../constants/business';

interface AtalhosPrazoProps {
  prazoMeses: string;
  onSelecionar: (meses: string) => void;
}

/** Atalhos de prazo (120/240/360/420 meses). */
export function AtalhosPrazo({ prazoMeses, onSelecionar }: AtalhosPrazoProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
      <span className="text-slate-400 mr-0.5">Atalhos:</span>
      {PRAZOS_SUGERIDOS.map((item) => {
        const ativo = prazoMeses === item.meses;
        return (
          <button
            key={item.meses}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelecionar(item.meses)}
            className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
              ativo ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {item.rotulo}
          </button>
        );
      })}
    </div>
  );
}
