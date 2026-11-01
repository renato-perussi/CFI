import type { Resultado } from '../../types/financing';
import { formatarMoeda } from '../../utils/format';
import { calcularValorPrincipal } from '../../utils/analysis';
import { handleSpotlightMouseMove } from '../../utils/spotlight';

interface ResultadoHeaderProps {
  titulo: string;
  resultado: Resultado;
  variante?: 'sac' | 'price';
  destaque?: boolean;
}

export function ResultadoHeader({
  titulo,
  resultado,
  variante = 'sac',
  destaque = false,
}: ResultadoHeaderProps) {
  const isSAC = variante === 'sac';

  const valorPrincipal = calcularValorPrincipal(resultado.totalPago, resultado.totalJuros);
  const percentualPrincipal =
    resultado.totalPago > 0 ? Math.round((valorPrincipal / resultado.totalPago) * 100) : 100;
  const percentualJuros = 100 - percentualPrincipal;

  return (
    <div
      onMouseMove={handleSpotlightMouseMove}
      className={`spotlight-card h-full flex flex-col justify-between rounded-2xl bg-white p-5 sm:p-6 transition-all border ${
        destaque
          ? 'border-stone-900 ring-1 ring-stone-900/10 shadow-md'
          : 'border-stone-200/90 shadow-xs'
      }`}
    >
      <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-stone-200/70 min-h-[3.25rem]">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              isSAC ? 'bg-[#c1ff72] border border-lime-600' : 'bg-[#002f43]'
            }`}
            aria-hidden="true"
          />
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider leading-snug text-stone-900 font-montserrat">
            {titulo}
          </h4>
        </div>

        {destaque && (
          <span className="shrink-0 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#c1ff72] text-stone-900 border border-[#aae65f]">
            Mais econômico
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-2xl bg-neutral-50 border border-stone-200/80 px-3.5 py-2.5 flex sm:block items-baseline justify-between gap-2">
          <p className="text-xs font-medium text-stone-500 sm:mb-1 font-montserrat">
            Parcela Inicial
          </p>
          <p className="text-base sm:text-lg font-semibold tracking-tighter text-stone-900 tabular-nums">
            {formatarMoeda(resultado.parcelaInicial)}
          </p>
        </div>

        <div className="rounded-2xl bg-neutral-50 border border-stone-200/80 px-3.5 py-2.5 flex sm:block items-baseline justify-between gap-2">
          <p className="text-xs font-medium text-stone-500 sm:mb-1 font-montserrat">
            {isSAC ? 'Parcela Final' : 'Parcela Final (Fixa)'}
          </p>
          <p className="text-base sm:text-lg font-semibold tracking-tighter text-stone-900 tabular-nums">
            {formatarMoeda(resultado.parcelaFinal)}
          </p>
        </div>

        <div className="rounded-2xl bg-neutral-50 border border-stone-200/80 px-3.5 py-2.5 flex sm:block items-baseline justify-between gap-2">
          <p className="text-xs font-medium text-stone-500 sm:mb-1 font-montserrat">Total Pago</p>
          <p className="text-base sm:text-lg font-semibold tracking-tighter text-stone-900 tabular-nums">
            {formatarMoeda(resultado.totalPago)}
          </p>
        </div>

        <div className="rounded-2xl bg-neutral-50 border border-stone-200/80 px-3.5 py-2.5 flex sm:block items-baseline justify-between gap-2">
          <p className="text-xs font-medium text-stone-500 sm:mb-1 font-montserrat">Total Juros</p>
          <p className="text-base sm:text-lg font-semibold tracking-tighter text-stone-900 tabular-nums">
            {formatarMoeda(resultado.totalJuros)}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-200/70">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5 tabular-nums">
          <span>Amortização: {percentualPrincipal}%</span>
          <span>Juros: {percentualJuros}%</span>
        </div>
        <div
          className="h-2 w-full rounded-full bg-stone-100 overflow-hidden flex"
          role="img"
          aria-label={`Composição do pagamento: ${percentualPrincipal}% amortização e ${percentualJuros}% juros`}
        >
          <div
            className="bg-stone-900 h-full transition-all duration-500"
            style={{ width: `${percentualPrincipal}%` }}
          />
          <div
            className={`${isSAC ? 'bg-[#c1ff72]' : 'bg-[#002f43]'} h-full transition-all duration-500`}
            style={{ width: `${percentualJuros}%` }}
          />
        </div>
      </div>
    </div>
  );
}
