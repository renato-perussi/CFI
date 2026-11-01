import { formatarMoeda, formatarPercentual } from '../../utils/format';

interface PreviewPrincipalProps {
  valor: number;
  valorImovelNum: number;
}

/** Preview do valor a financiar antes do cálculo. */
export function PreviewPrincipal({ valor, valorImovelNum }: PreviewPrincipalProps) {
  return (
    <div className="rounded-2xl bg-neutral-50 border border-stone-200 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm animate-fadeIn">
      <div className="flex items-center gap-2 font-montserrat text-stone-600">
        <span
          className="w-2.5 h-2.5 rounded-full bg-[#c1ff72] border border-lime-600 shrink-0"
          aria-hidden="true"
        />
        <span>Valor a financiar (Principal):</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-lg sm:text-xl font-semibold tracking-tighter text-stone-900 tabular-nums">
          {formatarMoeda(valor)}
        </span>
        <span className="text-xs font-medium text-stone-500 tabular-nums">
          ({formatarPercentual((valor / valorImovelNum) * 100, 0)}% do imóvel)
        </span>
      </div>
    </div>
  );
}
