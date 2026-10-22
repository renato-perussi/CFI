import type { Resultado } from '../../types/financing';
import { formatarMoeda } from '../../utils/format';
import { calcularValorPrincipal } from '../../utils/analysis';

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
      className={`h-full flex flex-col justify-between rounded-2xl bg-white p-5 sm:p-6 transition-all border ${
        destaque
          ? isSAC
            ? 'border-emerald-500/80 ring-1 ring-emerald-500/20 shadow-sm'
            : 'border-blue-500/80 ring-1 ring-blue-500/20 shadow-sm'
          : 'border-slate-200/90 shadow-xs'
      }`}
    >
      <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100 min-h-[3.25rem]">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              isSAC ? 'bg-emerald-500' : 'bg-blue-600'
            }`}
            aria-hidden="true"
          />
          <h4
            className={`text-xs sm:text-sm font-bold uppercase tracking-wider leading-snug ${
              isSAC ? 'text-emerald-800' : 'text-blue-800'
            }`}
          >
            {titulo}
          </h4>
        </div>

        {destaque && (
          <span
            className={`shrink-0 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
              isSAC
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-blue-100 text-blue-800 border border-blue-200'
            }`}
          >
            Mais econômico
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 flex sm:block items-baseline justify-between gap-2">
          <p className="text-xs font-medium text-slate-500 sm:mb-1">Parcela Inicial</p>
          <p className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
            {formatarMoeda(resultado.parcelaInicial)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 flex sm:block items-baseline justify-between gap-2">
          <p className="text-xs font-medium text-slate-500 sm:mb-1">
            {isSAC ? 'Parcela Final' : 'Parcela Final (Fixa)'}
          </p>
          <p className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
            {formatarMoeda(resultado.parcelaFinal)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 flex sm:block items-baseline justify-between gap-2">
          <p className="text-xs font-medium text-slate-500 sm:mb-1">Total Pago</p>
          <p className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
            {formatarMoeda(resultado.totalPago)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50/80 border border-slate-100 px-3.5 py-2.5 flex sm:block items-baseline justify-between gap-2">
          <p className="text-xs font-medium text-slate-500 sm:mb-1">Total Juros</p>
          <p
            className={`text-base sm:text-lg font-bold tabular-nums ${
              isSAC ? 'text-emerald-700' : 'text-blue-700'
            }`}
          >
            {formatarMoeda(resultado.totalJuros)}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 tabular-nums">
          <span>Amortização: {percentualPrincipal}%</span>
          <span>Juros: {percentualJuros}%</span>
        </div>
        <div
          className="h-2 w-full rounded-full bg-slate-100 overflow-hidden flex"
          role="img"
          aria-label={`Composição do pagamento: ${percentualPrincipal}% amortização e ${percentualJuros}% juros`}
        >
          <div
            className="bg-slate-700 h-full transition-all duration-500"
            style={{ width: `${percentualPrincipal}%` }}
          />
          <div
            className={`${isSAC ? 'bg-emerald-500' : 'bg-blue-500'} h-full transition-all duration-500`}
            style={{ width: `${percentualJuros}%` }}
          />
        </div>
      </div>
    </div>
  );
}
