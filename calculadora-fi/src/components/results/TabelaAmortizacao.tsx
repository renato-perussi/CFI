import { useState, useEffect, useMemo } from 'react';
import type { Parcela } from '../../types/financiamento';
import { formatarMoeda } from '../../utils/format';
import { Paginacao } from '../ui/Paginacao';
import { ITENS_POR_PAGINA } from '../../constants/negocio';

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
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 bg-slate-50/50">
        <h4 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
          {titulo}
        </h4>
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500 tabular-nums">
          <span>
            Exibindo meses <strong className="font-semibold text-slate-700">{mesInicial}</strong> a{' '}
            <strong className="font-semibold text-slate-700">{mesFinal}</strong> de{' '}
            <strong className="font-semibold text-slate-700">{dados.length}</strong>
          </span>
          <span className="sm:hidden text-slate-400">Deslize →</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm tabular-nums" role="table" aria-label={titulo}>
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80">
              <th
                scope="col"
                className="px-3.5 sm:px-5 py-3 text-left font-semibold text-slate-600 whitespace-nowrap"
              >
                Mês
              </th>
              <th
                scope="col"
                className="px-3.5 sm:px-5 py-3 text-right font-semibold text-slate-600 whitespace-nowrap"
              >
                Amortização
              </th>
              <th
                scope="col"
                className="px-3.5 sm:px-5 py-3 text-right font-semibold text-slate-600 whitespace-nowrap"
              >
                Juros
              </th>
              <th
                scope="col"
                className="px-3.5 sm:px-5 py-3 text-right font-bold text-slate-800 bg-slate-100/60 whitespace-nowrap"
              >
                Parcela
              </th>
              <th
                scope="col"
                className="px-3.5 sm:px-5 py-3 text-right font-semibold text-slate-600 whitespace-nowrap"
              >
                Saldo Devedor
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {dadosPaginados.map((parcela) => (
              <tr
                key={parcela.mes}
                className="even:bg-slate-50/40 hover:bg-blue-50/40 transition-colors"
              >
                <td className="px-3.5 sm:px-5 py-3 font-semibold text-slate-700 whitespace-nowrap">
                  {parcela.mes}
                </td>
                <td className="px-3.5 sm:px-5 py-3 text-right text-slate-600 whitespace-nowrap">
                  {formatarMoeda(parcela.amortizacao)}
                </td>
                <td className="px-3.5 sm:px-5 py-3 text-right text-slate-600 whitespace-nowrap">
                  {formatarMoeda(parcela.juros)}
                </td>
                <td className="px-3.5 sm:px-5 py-3 text-right font-bold text-slate-900 bg-slate-50/60 whitespace-nowrap">
                  {formatarMoeda(parcela.parcela)}
                </td>
                <td className="px-3.5 sm:px-5 py-3 text-right text-slate-600 whitespace-nowrap">
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
