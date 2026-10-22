export type AbaEducacao = 'sac' | 'price' | 'comparacao';

/** Textos do guia de decisão SAC vs Price. */
export const CONTEUDO = {
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
