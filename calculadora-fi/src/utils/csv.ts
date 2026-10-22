import type { Parcela } from '../types/financiamento';

const CABECALHOS = ['Mês', 'Amortização', 'Juros', 'Parcela', 'Saldo Devedor'];

function formatarValorCSV(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function gerarCSV(dados: Parcela[], separador = ';', titulo?: string): string {
  const linhas: string[] = [];

  if (titulo) {
    linhas.push(titulo);
    linhas.push('');
  }

  linhas.push(CABECALHOS.join(separador));

  for (const parcela of dados) {
    const linha = [
      String(parcela.mes),
      formatarValorCSV(parcela.amortizacao),
      formatarValorCSV(parcela.juros),
      formatarValorCSV(parcela.parcela),
      formatarValorCSV(parcela.saldoDevedor),
    ].join(separador);
    linhas.push(linha);
  }

  return linhas.join('\n');
}

export function gerarCSVCompleto(dadosSAC: Parcela[], dadosPrice: Parcela[]): string {
  const partes: string[] = [];

  partes.push(gerarCSV(dadosSAC, ';', 'SAC — Sistema de Amortização Constante'));
  partes.push('');
  partes.push(gerarCSV(dadosPrice, ';', 'Price — Sistema de Tabela Price'));

  return partes.join('\n');
}
