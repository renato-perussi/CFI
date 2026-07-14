import { useState, useMemo } from 'react';
import type { Parcela } from '../../types/financiamento';
import { formatarMoeda } from '../../utils/format';
import { Paginacao } from '../ui/Paginacao';

const ITENS_POR_PAGINA = 20;

interface TabelaAmortizacaoProps {
  titulo: string;
  dados: Parcela[];
}

export function TabelaAmortizacao({ titulo, dados }: TabelaAmortizacaoProps) {
  const [paginaAtual, setPaginaAtual] = useState(1);

  const totalPaginas = Math.ceil(dados.length / ITENS_POR_PAGINA);

  const dadosPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
    return dados.slice(inicio, inicio + ITENS_POR_PAGINA);
  }, [dados, paginaAtual]);

  const exibirPaginacao = dados.length > ITENS_POR_PAGINA;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{titulo}</h4>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table" aria-label={titulo}>
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-600">Mês</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-600">Amortização</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-600">Juros</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-600">Parcela</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-600">Saldo Devedor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dadosPaginados.map((parcela) => (
              <tr key={parcela.mes} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">{parcela.mes}</td>
                <td className="px-4 py-3 text-right text-gray-700">
                  {formatarMoeda(parcela.amortizacao)}
                </td>
                <td className="px-4 py-3 text-right text-gray-700">
                  {formatarMoeda(parcela.juros)}
                </td>
                <td className="px-4 py-3 text-right font-medium text-gray-800">
                  {formatarMoeda(parcela.parcela)}
                </td>
                <td className="px-4 py-3 text-right text-gray-700">
                  {formatarMoeda(parcela.saldoDevedor)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {exibirPaginacao && (
        <Paginacao
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          onPaginaChange={setPaginaAtual}
        />
      )}
    </div>
  );
}
