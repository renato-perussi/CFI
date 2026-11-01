import { useState, useEffect, useMemo } from 'react';
import type { Parcela } from '../../types/financing';
import { formatarMoeda } from '../../utils/format';
import { Paginacao } from '../ui';
import { ITENS_POR_PAGINA } from '../../constants/business';

interface TabelaAmortizacaoProps {
  titulo: string;
  dados: Parcela[];
}

export function TabelaAmortizacao({ titulo, dados }: TabelaAmortizacaoProps) {
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    setPaginaAtual(1);
  }, [dados]);

  const totalPaginas = Math.max(Math.ceil(dados.length / ITENS_POR_PAGINA), 1);
  const paginaSegura = Math.min(paginaAtual, totalPaginas);

  const dadosPaginados = useMemo(() => {
    const inicio = (paginaSegura - 1) * ITENS_POR_PAGINA;
    return dados.slice(inicio, inicio + ITENS_POR_PAGINA);
  }, [dados, paginaSegura]);

  const exibirPaginacao = dados.length > ITENS_POR_PAGINA;
  const mesInicial = dadosPaginados[0]?.mes ?? 0;
  const mesFinal = dadosPaginados[dadosPaginados.length - 1]?.mes ?? 0;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 bg-neutral-50">
        <h4 className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider font-montserrat">
          {titulo}
        </h4>
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-stone-500 tabular-nums">
          <span>
            Exibindo meses <strong className="font-semibold text-stone-700">{mesInicial}</strong> a{' '}
            <strong className="font-semibold text-stone-700">{mesFinal}</strong> de{' '}
            <strong className="font-semibold text-stone-700">{dados.length}</strong>
          </span>
          <span className="sm:hidden text-stone-400">Deslize →</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm tabular-nums" role="table" aria-label={titulo}>
          <thead>
            <tr className="bg-neutral-50 border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500 font-montserrat">
              <th
                scope="col"
                className="px-3.5 sm:px-5 py-3 text-left font-semibold whitespace-nowrap"
              >
                Mês
              </th>
              <th
                scope="col"
                className="px-3.5 sm:px-5 py-3 text-right font-semibold whitespace-nowrap"
              >
                Amortização
              </th>
              <th
                scope="col"
                className="px-3.5 sm:px-5 py-3 text-right font-semibold whitespace-nowrap"
              >
                Juros
              </th>
              <th
                scope="col"
                className="px-3.5 sm:px-5 py-3 text-right font-bold text-stone-900 bg-stone-100/80 whitespace-nowrap"
              >
                Parcela
              </th>
              <th
                scope="col"
                className="px-3.5 sm:px-5 py-3 text-right font-semibold whitespace-nowrap"
              >
                Saldo Devedor
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/70">
            {dadosPaginados.map((parcela) => (
              <tr
                key={parcela.mes}
                className="even:bg-neutral-50/40 hover:bg-[#c1ff72]/15 transition-colors"
              >
                <td className="px-3.5 sm:px-5 py-3 font-semibold text-stone-700 whitespace-nowrap">
                  {parcela.mes}
                </td>
                <td className="px-3.5 sm:px-5 py-3 text-right text-stone-600 whitespace-nowrap">
                  {formatarMoeda(parcela.amortizacao)}
                </td>
                <td className="px-3.5 sm:px-5 py-3 text-right text-stone-600 whitespace-nowrap">
                  {formatarMoeda(parcela.juros)}
                </td>
                <td className="px-3.5 sm:px-5 py-3 text-right font-bold text-stone-900 bg-stone-100/80 whitespace-nowrap">
                  {formatarMoeda(parcela.parcela)}
                </td>
                <td className="px-3.5 sm:px-5 py-3 text-right text-stone-600 whitespace-nowrap">
                  {formatarMoeda(parcela.saldoDevedor)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {exibirPaginacao && (
        <Paginacao
          paginaAtual={paginaSegura}
          totalPaginas={totalPaginas}
          onPaginaChange={setPaginaAtual}
        />
      )}
    </div>
  );
}
