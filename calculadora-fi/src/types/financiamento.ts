export interface Financiamento {
  valorImovel: number;
  entrada: number;
  taxaJuros: number;
  prazoMeses: number;
}

export interface Parcela {
  mes: number;
  amortizacao: number;
  juros: number;
  parcela: number;
  saldoDevedor: number;
}

export interface Resultado {
  totalPago: number;
  totalJuros: number;
  parcelaInicial: number;
  parcelaFinal: number;
  tabela: Parcela[];
}

export interface ComparacaoFinanciamento {
  melhorOpcao: 'SAC' | 'PRICE';
  economia: number;
  resultadoSAC: Resultado;
  resultadoPrice: Resultado;
}
