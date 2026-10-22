import { useState, useMemo } from 'react';
import type { ComparacaoFinanciamento as ComparacaoType } from '../../types/financiamento';
import { formatarMoeda } from '../../utils/format';
import { ResultadoHeader } from './ResultadoHeader';
import { TabelaAmortizacao } from './TabelaAmortizacao';
import { GraficoLinha } from './GraficoLinha';
import { WhatsAppShareButton } from '../sharing/WhatsAppShareButton';
import { BotaoExportarCSV } from './BotaoExportarCSV';

interface ComparacaoFinanciamentoProps {
  dados: ComparacaoType;
}

export function ComparacaoFinanciamento({ dados }: ComparacaoFinanciamentoProps) {
  const [abaAtiva, setAbaAtiva] = useState<'SAC' | 'PRICE'>('SAC');

  const isSAC = dados.melhorOpcao === 'SAC';

  const mesCruzamento = useMemo(() => {
    const tabelaSAC = dados.resultadoSAC.tabela;
    const tabelaPrice = dados.resultadoPrice.tabela;
    for (let i = 0; i < tabelaSAC.length; i++) {
      if (tabelaSAC[i] && tabelaPrice[i] && tabelaSAC[i].parcela <= tabelaPrice[i].parcela) {
        return tabelaSAC[i].mes;
      }
    }
    return null;
  }, [dados]);

  const maiorTotal = Math.max(dados.resultadoSAC.totalPago, dados.resultadoPrice.totalPago);
  const percentualEconomia =
    maiorTotal > 0
      ? ((dados.economia / maiorTotal) * 100).toLocaleString('pt-BR', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })
      : '0,0';

  return (
    <div className="space-y-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ResultadoHeader
          titulo="SAC — Sistema de Amortização Constante"
          resultado={dados.resultadoSAC}
          variante="sac"
          destaque={isSAC}
        />
        <ResultadoHeader
          titulo="Price — Sistema de Tabela Price"
          resultado={dados.resultadoPrice}
          variante="price"
          destaque={!isSAC}
        />
      </div>

      <section aria-label="Análise gráfica comparativa" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Análise Gráfica Comparativa
            </h3>
            <p className="text-sm text-slate-600">
              Comportamento das prestações, juros, amortização e evolução da dívida mês a mês.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GraficoLinha
            titulo="Evolução das Parcelas"
            rotuloEixoY="Valor da Parcela (R$)"
            rotuloSAC="Parcela SAC"
            rotuloPrice="Parcela Price"
            campoDados="parcela"
            resultadoSAC={dados.resultadoSAC}
            resultadoPrice={dados.resultadoPrice}
          />

          <GraficoLinha
            titulo="Evolução dos Juros"
            rotuloEixoY="Valor dos Juros (R$)"
            rotuloSAC="Juros SAC"
            rotuloPrice="Juros Price"
            campoDados="juros"
            resultadoSAC={dados.resultadoSAC}
            resultadoPrice={dados.resultadoPrice}
          />

          <GraficoLinha
            titulo="Evolução da Amortização"
            rotuloEixoY="Valor da Amortização (R$)"
            rotuloSAC="Amortização SAC"
            rotuloPrice="Amortização Price"
            campoDados="amortizacao"
            resultadoSAC={dados.resultadoSAC}
            resultadoPrice={dados.resultadoPrice}
          />

          <GraficoLinha
            titulo="Evolução do Saldo Devedor"
            rotuloEixoY="Saldo Devedor (R$)"
            rotuloSAC="Saldo Devedor SAC"
            rotuloPrice="Saldo Devedor Price"
            campoDados="saldoDevedor"
            resultadoSAC={dados.resultadoSAC}
            resultadoPrice={dados.resultadoPrice}
          />
        </div>
      </section>

      <section aria-label="Tabelas de amortização" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
          <div
            className="grid grid-cols-2 sm:flex bg-slate-100 p-1 rounded-xl gap-1"
            role="tablist"
            aria-label="Selecionar tabela de amortização"
          >
            <button
              type="button"
              id="tab-tabela-sac"
              role="tab"
              aria-selected={abaAtiva === 'SAC'}
              aria-controls="painel-tabela-sac"
              onClick={() => setAbaAtiva('SAC')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                abaAtiva === 'SAC'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tabela SAC
            </button>
            <button
              type="button"
              id="tab-tabela-price"
              role="tab"
              aria-selected={abaAtiva === 'PRICE'}
              aria-controls="painel-tabela-price"
              onClick={() => setAbaAtiva('PRICE')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                abaAtiva === 'PRICE'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tabela Price
            </button>
          </div>

          <BotaoExportarCSV
            dadosSAC={dados.resultadoSAC.tabela}
            dadosPrice={dados.resultadoPrice.tabela}
          />
        </div>

        {abaAtiva === 'SAC' ? (
          <div
            key="sac-table"
            id="painel-tabela-sac"
            role="tabpanel"
            aria-labelledby="tab-tabela-sac"
            className="animate-fadeIn"
          >
            <TabelaAmortizacao
              titulo="SAC — Tabela de Amortização"
              dados={dados.resultadoSAC.tabela}
            />
          </div>
        ) : (
          <div
            key="price-table"
            id="painel-tabela-price"
            role="tabpanel"
            aria-labelledby="tab-tabela-price"
            className="animate-fadeIn"
          >
            <TabelaAmortizacao
              titulo="Price — Tabela de Amortização"
              dados={dados.resultadoPrice.tabela}
            />
          </div>
        )}
      </section>
    </div>
  );
}
