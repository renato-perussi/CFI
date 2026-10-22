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
    <section className="pt-4" aria-labelledby="educacao-titulo">
      <div className="mb-5">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
          Guia de Decisão
        </span>
        <h2 id="educacao-titulo" className="text-xl sm:text-2xl font-bold text-slate-900">
          Entenda os Sistemas de Financiamento
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Conheça as diferenças estruturais entre SAC e Price para tomar a melhor decisão.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden">
        <div className="p-2 sm:p-3 bg-slate-50 border-b border-slate-200/80">
          <div
            className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-xl"
            role="tablist"
            aria-label="Conteúdo educativo"
          >
            <button
              type="button"
              id="tab-sac"
              role="tab"
              aria-selected={abaAtiva === 'sac'}
              aria-controls="painel-sac"
              onClick={() => setAbaAtiva('sac')}
              className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                abaAtiva === 'sac'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SAC
            </button>
            <button
              type="button"
              id="tab-price"
              role="tab"
              aria-selected={abaAtiva === 'price'}
              aria-controls="painel-price"
              onClick={() => setAbaAtiva('price')}
              className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                abaAtiva === 'price'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Price
            </button>
            <button
              type="button"
              id="tab-comparacao"
              role="tab"
              aria-selected={abaAtiva === 'comparacao'}
              aria-controls="painel-comparacao"
              onClick={() => setAbaAtiva('comparacao')}
              className={`px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                abaAtiva === 'comparacao'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Comparação
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-8">
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
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 font-bold text-sm shrink-0">
          SAC
        </span>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{sac.titulo}</h3>
          <p className="text-xs sm:text-sm text-slate-500">{sac.subtitulo}</p>
        </div>
      </div>

      <p className="text-slate-700 text-sm sm:text-base mb-5 leading-relaxed">{sac.descricao}</p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {sac.pontos.map((ponto) => (
          <li
            key={ponto}
            className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50/80 border border-slate-100 rounded-xl p-3.5"
          >
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold shrink-0 mt-0.5"
              aria-hidden="true"
            >
              ✓
            </span>
            <span>{ponto}</span>
          </li>
        ))}
      </ul>

      <div className="bg-slate-900 text-slate-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Fórmula de Cálculo
        </span>
        <code className="text-xs sm:text-sm font-mono text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
          {sac.formula}
        </code>
      </div>
    </div>
  );
}

function PainelPrice() {
  const { price } = CONTEUDO;

  return (
    <div id="painel-price" role="tabpanel" aria-labelledby="tab-price">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-bold text-xs shrink-0">
          PRICE
        </span>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{price.titulo}</h3>
          <p className="text-xs sm:text-sm text-slate-500">{price.subtitulo}</p>
        </div>
      </div>

      <p className="text-slate-700 text-sm sm:text-base mb-5 leading-relaxed">{price.descricao}</p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {price.pontos.map((ponto) => (
          <li
            key={ponto}
            className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50/80 border border-slate-100 rounded-xl p-3.5"
          >
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0 mt-0.5"
              aria-hidden="true"
            >
              ✓
            </span>
            <span>{ponto}</span>
          </li>
        ))}
      </ul>

      <div className="bg-slate-900 text-slate-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Fórmula de Cálculo
        </span>
        <code className="text-xs sm:text-sm font-mono text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
          {price.formula}
        </code>
      </div>
    </div>
  );
}

function PainelComparacao() {
  const { comparacao } = CONTEUDO;

  return (
    <div id="painel-comparacao" role="tabpanel" aria-labelledby="tab-comparacao">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-slate-900">{comparacao.titulo}</h3>
        <p className="text-xs sm:text-sm text-slate-500">{comparacao.subtitulo}</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200/80">
        <table className="w-full text-xs sm:text-sm" role="table">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80">
              <th className="text-left py-3 px-3 sm:px-4 font-semibold text-slate-700">Critério</th>
              <th className="text-left py-3 px-3 sm:px-4 font-bold text-emerald-700">SAC</th>
              <th className="text-left py-3 px-3 sm:px-4 font-bold text-blue-700">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {comparacao.criterios.map((item) => (
              <tr
                key={item.criterio}
                className="even:bg-slate-50/40 hover:bg-slate-50 transition-colors"
              >
                <td className="py-3 px-3 sm:px-4 font-semibold text-slate-800">{item.criterio}</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-800 font-medium">{item.sac}</td>
                <td className="py-3 px-3 sm:px-4 text-blue-800 font-medium">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
