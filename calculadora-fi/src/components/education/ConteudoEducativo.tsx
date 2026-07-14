import { useState } from 'react';

type AbaEducacao = 'sac' | 'price' | 'comparacao';

const CONTEUDO = {
  sac: {
    titulo: 'O que é SAC?',
    subtitulo: 'Sistema de Amortização Constante',
    descricao:
      'No sistema SAC, o valor da amortização (parcela principal) é fixo ao longo de todo o financiamento. Como os juros incidem sobre o saldo devedor, que diminui a cada mês, as parcelas também vão diminuindo.',
    pontos: [
      'Parcelas começam maiores e vão diminuindo com o tempo',
      'Amortização é constante (dividida igualmente entre as parcelas)',
      'Total de juros pago é menor que no Price',
      'Ideal para quem tem renda que pode crescer ao longo do tempo',
    ],
    formula: 'Parcela = Amortização Fixa + (Saldo Devedor × Taxa de Juros)',
  },
  price: {
    titulo: 'O que é Price?',
    subtitulo: 'Tabela Price',
    descricao:
      'No sistema Price, a parcela é fixa durante todo o financiamento. No início, uma maior proporção da parcela vai para juros, e gradualmente a amortização vai aumentando.',
    pontos: [
      'Parcela fixa durante todo o financiamento',
      'Previsibilidade no orçamento mensal',
      'Total de juros pago é maior que no SAC',
      'Ideal para quem precisa de previsibilidade nas parcelas',
    ],
    formula: 'Parcela Fixa = Valor Financiado × [i × (1+i)ⁿ] / [(1+i)ⁿ − 1]',
  },
  comparacao: {
    titulo: 'SAC vs Price',
    subtitulo: 'Qual a diferença?',
    criterios: [
      {
        criterio: 'Parcela inicial',
        sac: 'Maior',
        price: 'Menor (fixa)',
      },
      {
        criterio: 'Parcela final',
        sac: 'Menor',
        price: 'Igual à inicial',
      },
      {
        criterio: 'Comportamento',
        sac: 'Decrescente',
        price: 'Constante',
      },
      {
        criterio: 'Total de juros',
        sac: 'Menor',
        price: 'Maior',
      },
      {
        criterio: 'Previsibilidade',
        sac: 'Baixa (parcelas variam)',
        price: 'Alta (parcela fixa)',
      },
      {
        criterio: 'Fluxo de caixa',
        sac: 'Melhora ao longo do tempo',
        price: 'Sempre o mesmo',
      },
      {
        criterio: 'Ideal para',
        sac: 'Quem quer economizar no total',
        price: 'Quem quer previsibilidade',
      },
    ],
  },
} as const;

export function ConteudoEducativo() {
  const [abaAtiva, setAbaAtiva] = useState<AbaEducacao>('sac');

  return (
    <section className="mt-12" aria-labelledby="educacao-titulo">
      <h2 id="educacao-titulo" className="text-2xl font-semibold text-gray-800 mb-2">
        Entenda os Sistemas de Financiamento
      </h2>
      <p className="text-gray-600 mb-6">
        Conheça as diferenças entre SAC e Price para tomar a melhor decisão.
      </p>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div
          className="flex border-b border-gray-200"
          role="tablist"
          aria-label="Conteúdo educativo"
        >
          <button
            type="button"
            role="tab"
            aria-selected={abaAtiva === 'sac'}
            aria-controls="painel-sac"
            onClick={() => setAbaAtiva('sac')}
            className={`flex-1 px-4 py-3 text-sm font-semibold transition-all duration-300 ${
              abaAtiva === 'sac'
                ? 'text-green-700 border-b-2 border-green-600 bg-green-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            SAC
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={abaAtiva === 'price'}
            aria-controls="painel-price"
            onClick={() => setAbaAtiva('price')}
            className={`flex-1 px-4 py-3 text-sm font-semibold transition-all duration-300 ${
              abaAtiva === 'price'
                ? 'text-blue-700 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Price
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={abaAtiva === 'comparacao'}
            aria-controls="painel-comparacao"
            onClick={() => setAbaAtiva('comparacao')}
            className={`flex-1 px-4 py-3 text-sm font-semibold transition-all duration-300 ${
              abaAtiva === 'comparacao'
                ? 'text-purple-700 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Comparação
          </button>
        </div>

        <div className="p-6">
          <div key={abaAtiva} className="animate-fadeIn">
            {abaAtiva === 'sac' && <PainelSAC />}
            {abaAtiva === 'price' && <PainelPrice />}
            {abaAtiva === 'comparacao' && <PainelComparacao />}
          </div>
        </div>
      </div>
    </section>
  );
}

function PainelSAC() {
  const { sac } = CONTEUDO;

  return (
    <div id="painel-sac" role="tabpanel" aria-labelledby="tab-sac">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-green-700">{sac.titulo}</h3>
        <p className="text-sm text-gray-500">{sac.subtitulo}</p>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{sac.descricao}</p>

      <ul className="space-y-2 mb-5">
        {sac.pontos.map((ponto) => (
          <li key={ponto} className="flex items-start gap-2 text-gray-700">
            <span className="text-green-500 mt-1" aria-hidden="true">
              ✓
            </span>
            <span>{ponto}</span>
          </li>
        ))}
      </ul>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm font-medium text-green-800 mb-1">Fórmula:</p>
        <code className="text-green-900 text-sm">{sac.formula}</code>
      </div>
    </div>
  );
}

function PainelPrice() {
  const { price } = CONTEUDO;

  return (
    <div id="painel-price" role="tabpanel" aria-labelledby="tab-price">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-blue-700">{price.titulo}</h3>
        <p className="text-sm text-gray-500">{price.subtitulo}</p>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{price.descricao}</p>

      <ul className="space-y-2 mb-5">
        {price.pontos.map((ponto) => (
          <li key={ponto} className="flex items-start gap-2 text-gray-700">
            <span className="text-blue-500 mt-1" aria-hidden="true">
              ✓
            </span>
            <span>{ponto}</span>
          </li>
        ))}
      </ul>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-800 mb-1">Fórmula:</p>
        <code className="text-blue-900 text-sm">{price.formula}</code>
      </div>
    </div>
  );
}

function PainelComparacao() {
  const { comparacao } = CONTEUDO;

  return (
    <div id="painel-comparacao" role="tabpanel" aria-labelledby="tab-comparacao">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-purple-700">{comparacao.titulo}</h3>
        <p className="text-sm text-gray-500">{comparacao.subtitulo}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Critério</th>
              <th className="text-left py-3 px-4 font-semibold text-green-700">SAC</th>
              <th className="text-left py-3 px-4 font-semibold text-blue-700">Price</th>
            </tr>
          </thead>
          <tbody>
            {comparacao.criterios.map((item) => (
              <tr
                key={item.criterio}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 font-medium text-gray-800">{item.criterio}</td>
                <td className="py-3 px-4 text-green-700">{item.sac}</td>
                <td className="py-3 px-4 text-blue-700">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
