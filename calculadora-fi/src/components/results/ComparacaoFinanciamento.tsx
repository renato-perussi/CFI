import { useState } from 'react';
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

  return (
    <div className="mt-8 space-y-6">
      <div
        className={`p-6 rounded-xl border-2 transition-all duration-500 ${
          isSAC ? 'border-green-500 bg-green-50' : 'border-blue-500 bg-blue-50'
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              isSAC ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            }`}
          >
            ✓
          </span>
          <h3 className="text-lg font-bold text-gray-800">Melhor opção: {dados.melhorOpcao}</h3>
        </div>
        <p className="text-gray-700 ml-11">
          Economia de{' '}
          <strong className={isSAC ? 'text-green-700' : 'text-blue-700'}>
            {formatarMoeda(dados.economia)}
          </strong>{' '}
          em relação ao outro sistema.
        </p>

        <div className="ml-11 mt-3">
          <WhatsAppShareButton dados={dados} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultadoHeader
          titulo="SAC — Sistema de Amortização Constante"
          resultado={dados.resultadoSAC}
          variante="sac"
        />
        <ResultadoHeader
          titulo="Price — Sistema de Tabela Price"
          resultado={dados.resultadoPrice}
          variante="price"
        />
      </div>

      <GraficoLinha
        titulo="Evolução das Parcelas ao Longo do Tempo"
        rotuloEixoY="Valor da Parcela (R$)"
        rotuloSAC="Parcela SAC"
        rotuloPrice="Parcela Price"
        campoDados="parcela"
        resultadoSAC={dados.resultadoSAC}
        resultadoPrice={dados.resultadoPrice}
      />

      <GraficoLinha
        titulo="Evolução dos Juros ao Longo do Tempo"
        rotuloEixoY="Valor dos Juros (R$)"
        rotuloSAC="Juros SAC"
        rotuloPrice="Juros Price"
        campoDados="juros"
        resultadoSAC={dados.resultadoSAC}
        resultadoPrice={dados.resultadoPrice}
      />

      <GraficoLinha
        titulo="Evolução da Amortização ao Longo do Tempo"
        rotuloEixoY="Valor da Amortização (R$)"
        rotuloSAC="Amortização SAC"
        rotuloPrice="Amortização Price"
        campoDados="amortizacao"
        resultadoSAC={dados.resultadoSAC}
        resultadoPrice={dados.resultadoPrice}
      />

      <GraficoLinha
        titulo="Evolução do Saldo Devedor ao Longo do Tempo"
        rotuloEixoY="Saldo Devedor (R$)"
        rotuloSAC="Saldo Devedor SAC"
        rotuloPrice="Saldo Devedor Price"
        campoDados="saldoDevedor"
        resultadoSAC={dados.resultadoSAC}
        resultadoPrice={dados.resultadoPrice}
      />

      <div>
        <div className="flex items-center justify-between border-b border-gray-200 mb-6">
          <div className="flex">
            <button
              type="button"
              onClick={() => setAbaAtiva('SAC')}
              className={`px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                abaAtiva === 'SAC'
                  ? 'text-green-700 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Tabela SAC
            </button>
            <button
              type="button"
              onClick={() => setAbaAtiva('PRICE')}
              className={`px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                abaAtiva === 'PRICE'
                  ? 'text-blue-700 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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
          <div key="sac-table" className="animate-fadeIn">
            <TabelaAmortizacao
              titulo="SAC — Tabela de Amortização"
              dados={dados.resultadoSAC.tabela}
            />
          </div>
        ) : (
          <div key="price-table" className="animate-fadeIn">
            <TabelaAmortizacao
              titulo="Price — Tabela de Amortização"
              dados={dados.resultadoPrice.tabela}
            />
          </div>
        )}
      </div>
    </div>
  );
}
