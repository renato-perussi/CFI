import { useMemo } from 'react';
import type { ComparacaoFinanciamento as ComparacaoType } from '../../types/financing';
import { formatarMoeda } from '../../utils/format';
import { calcularMesCruzamento, calcularPercentualEconomia } from '../../utils/analysis';
import { WhatsAppShareButton } from './WhatsAppShareButton';

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
      className={`relative overflow-hidden rounded-[32px] p-6 md:p-8 border transition-all ${
        isSAC
          ? 'bg-stone-900 text-white border-stone-800'
          : 'bg-[#002f43] text-white border-sky-900'
      }`}
    >
      <div
        className={`pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl ${
          isSAC ? 'bg-[#c1ff72]/15' : 'bg-sky-400/15'
        }`}
        aria-hidden="true"
      />
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className={`inline-flex items-center justify-center w-8 h-8 rounded-xl text-sm font-bold shadow-xs shrink-0 ${
                isSAC ? 'bg-[#c1ff72] text-stone-900' : 'bg-white text-[#002f43]'
              }`}
            >
              ✓
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-stone-300 block font-montserrat">
                Recomendação Financeira
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Melhor opção: {dados.melhorOpcao}
              </h3>
            </div>
          </div>

          <p className="text-stone-200 text-sm sm:text-base sm:pl-11">
            Economia total de{' '}
            <strong className="font-extrabold tabular-nums text-[#c1ff72]">
              {formatarMoeda(dados.economia)}
            </strong>{' '}
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#c1ff72] text-stone-900 border border-[#aae65f] tabular-nums">
              -{percentualEconomia}%
            </span>{' '}
            em relação ao outro sistema.
          </p>

          {mesCruzamento && dados.economia > 0 && (
            <p className="text-xs sm:text-sm text-stone-300 sm:pl-11">
              Ponto de equilíbrio: a partir do{' '}
              <strong className="font-semibold text-white">{mesCruzamento}º mês</strong> (de{' '}
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
