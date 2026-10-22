/**
 * Derivados de UI em funções puras testadas. Recebem números já parseados;
 * sem estado React. Núcleo `calculations.ts` intocado.
 */
import type { Parcela } from '../types/financing';
import { formatarPercentual } from './format';

/**
 * Mês em que a parcela SAC cruza para baixo da Price (`null` se nunca cruzar).
 */
export function calcularMesCruzamento(tabelaSAC: Parcela[], tabelaPrice: Parcela[]): number | null {
  for (let i = 0; i < tabelaSAC.length; i++) {
    const parcelaSAC = tabelaSAC[i];
    const parcelaPrice = tabelaPrice[i];
    if (parcelaSAC && parcelaPrice && parcelaSAC.parcela <= parcelaPrice.parcela) {
      return parcelaSAC.mes;
    }
  }
  return null;
}

/** Percentual de economia pt-BR com 1 casa; `maiorTotal <= 0` → `'0,0'`. */
export function calcularPercentualEconomia(economia: number, maiorTotal: number): string {
  return maiorTotal > 0 ? formatarPercentual((economia / maiorTotal) * 100) : '0,0';
}

/** Valor principal recomposto (`totalPago - totalJuros`, nunca negativo). */
export function calcularValorPrincipal(totalPago: number, totalJuros: number): number {
  return Math.max(Number((totalPago - totalJuros).toFixed(2)), 0);
}

/** Taxa anual equivalente (`"≈ X,XX% a.a."`); zerada → `'Taxa efetiva'`. */
export function calcularTaxaAnualEquivalente(taxaMensal: number): string {
  return taxaMensal > 0
    ? `≈ ${formatarPercentual((Math.pow(1 + taxaMensal / 100, 12) - 1) * 100, 2)}% a.a.`
    : 'Taxa efetiva';
}

/** Rótulo do prazo: meses, anos redondos ou `"Xa Ym"`; `<= 0` → hint de máximo. */
export function formatarPrazoEmAnos(prazoMeses: number): string {
  if (prazoMeses <= 0) return 'Máx. 600 meses';
  const anos = Math.floor(prazoMeses / 12);
  const mesesRestantes = prazoMeses % 12;
  if (anos === 0) return `${mesesRestantes} ${mesesRestantes === 1 ? 'mês' : 'meses'}`;
  if (mesesRestantes === 0) return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  return `${anos}a ${mesesRestantes}m`;
}

/** Percentual da entrada (`"X% do imóvel"`); inválidos → `'Mín. 20%'`. */
export function calcularPercentualEntrada(valorImovel: number, entrada: number): string {
  return valorImovel > 0 && entrada > 0
    ? `${formatarPercentual((entrada / valorImovel) * 100, 1, 0)}% do imóvel`
    : 'Mín. 20%';
}

/** Preview do valor a financiar; fora da regra de 20% → `null`. */
export function calcularValorFinanciadoPreview(
  valorImovel: number,
  entrada: number
): number | null {
  return valorImovel > 0 && entrada >= valorImovel * 0.2 && entrada < valorImovel
    ? valorImovel - entrada
    : null;
}
