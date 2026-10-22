import { formatarMoeda, formatarPercentual } from '../../utils/format';

interface PreviewPrincipalProps {
  valor: number;
  valorImovelNum: number;
}

/** Preview do valor a financiar antes do cálculo. */
export function PreviewPrincipal({ valor, valorImovelNum }: PreviewPrincipalProps) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm animate-fadeIn">
      <div className="flex items-center gap-2 text-slate-600">
        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" aria-hidden="true" />
        <span>Valor a financiar (Principal):</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-base font-bold text-slate-900 tabular-nums">
          {formatarMoeda(valor)}
        </span>
        <span className="text-xs font-medium text-slate-500 tabular-nums">
          ({formatarPercentual((valor / valorImovelNum) * 100, 0)}% do imóvel)
        </span>
      </div>
    </div>
  );
}
