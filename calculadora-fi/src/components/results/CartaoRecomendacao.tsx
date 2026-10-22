import { useMemo } from 'react';
import type { ComparacaoFinanciamento as ComparacaoType } from '../../types/financiamento';
import { formatarMoeda } from '../../utils/format';
import { calcularMesCruzamento, calcularPercentualEconomia } from '../../utils/analise';
import { WhatsAppShareButton } from '../sharing/WhatsAppShareButton';

interface CartaoRecomendacaoProps {
  dados: ComparacaoType;
}

/** Cartão de recomendação: melhor opção, economia e ponto de equilíbrio SAC/Price. */
export function CartaoRecomendacao({ dados }: CartaoRecomendacaoProps) {
  const isSAC = dados.melhorOpcao === 'SAC';

  const mesCruzamento = useMemo(
    () => calcularMesCruzamento(dados.resultadoSAC.tabela, dados.resultadoPrice.tabela),
    [dados]
  );

  const maiorTotal = Math.max(dados.resultadoSAC.totalPago, dados.resultadoPrice.totalPago);
  const percentualEconomia = calcularPercentualEconomia(dados.economia, maiorTotal);

  return (
    <div
      className={`p-6 md:p-7 rounded-2xl border transition-all duration-300 ${
        isSAC
          ? 'border-emerald-200 bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/40'
          : 'border-blue-200 bg-gradient-to-br from-blue-50/90 via-white to-blue-50/40'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center justify-center w-8 h-8 rounded-xl text-sm font-bold shadow-xs shrink-0 ${
                isSAC ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
              }`}
            >
              ✓
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                Recomendação Financeira
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Melhor opção: {dados.melhorOpcao}
              </h3>
            </div>
          </div>

          <p className="text-slate-700 text-sm sm:text-base sm:pl-11">
            Economia total de{' '}
            <strong
              className={`font-extrabold tabular-nums ${
                isSAC ? 'text-emerald-700' : 'text-blue-700'
              }`}
            >
              {formatarMoeda(dados.economia)}
            </strong>{' '}
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 tabular-nums">
              -{percentualEconomia}%
            </span>{' '}
            em relação ao outro sistema.
          </p>

          {mesCruzamento && dados.economia > 0 && (
            <p className="text-xs sm:text-sm text-slate-600 sm:pl-11">
              Ponto de equilíbrio: a partir do{' '}
              <strong className="font-semibold text-slate-800">{mesCruzamento}º mês</strong> (de{' '}
              {dados.resultadoSAC.tabela.length}), a parcela mensal do SAC passa a ser menor que a
              parcela fixa da Price.
            </p>
          )}
        </div>

        <div className="sm:pl-11 md:pl-0 flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-2">
          <WhatsAppShareButton dados={dados} />
        </div>
      </div>
    </div>
  );
}
