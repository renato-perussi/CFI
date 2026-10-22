/**
 * Sprint 14 — Derivados Puros (RFR-002).
 *
 * Lógica derivada extraída dos componentes de UI para funções puras testadas.
 * Núcleo `calculos.ts` intocado. Todas as funções recebem NÚMEROS já parseados
 * (a máscara continua resolvida na UI via `format.ts` até a Sprint 15) e nunca
 * tocam em estado React (`useMemo` fica no componente, se necessário).
 *
 * Fontes (extração verbatim, sem mudança de comportamento):
 * - `calcularMesCruzamento` ← `ComparacaoFinanciamento.tsx:19-28`
 * - `calcularPercentualEconomia` ← `ComparacaoFinanciamento.tsx:30-37`
 * - `calcularValorPrincipal` ← `ResultadoHeader.tsx:19-25`
 * - `calcularTaxaAnualEquivalente`, `formatarPrazoEmAnos`,
 *   `calcularPercentualEntrada`, `calcularValorFinanciadoPreview`
 *   ← `FormCalculator.tsx:34-62`
 */
import type { Parcela } from '../types/financiamento';

/**
 * S14-01 — Mês em que a parcela SAC cruza para baixo da Price.
 * Scan linear; `null` quando SAC nunca fica menor ou igual (ou tabelas vazias).
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

/**
 * S14-02 — Percentual de economia formatado pt-BR com 1 casa (`"X,X"`).
 * Guarda divisão por zero: `maiorTotal <= 0` → `'0,0'`.
 */
export function calcularPercentualEconomia(economia: number, maiorTotal: number): string {
  return maiorTotal > 0
    ? ((economia / maiorTotal) * 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })
    : '0,0';
}

/**
 * S14-02 — Valor principal recomposto (`totalPago - totalJuros`, 2 casas).
 * Trava em `0`: nunca retorna negativo.
 */
export function calcularValorPrincipal(totalPago: number, totalJuros: number): number {
  return Math.max(Number((totalPago - totalJuros).toFixed(2)), 0);
}

/**
 * S14-03 — Taxa anual equivalente (`(1+m/100)^12 - 1`) formatada
 * pt-BR com 2 casas (`"≈ X,XX% a.a."`); taxa zerada → `'Taxa efetiva'`.
 */
export function calcularTaxaAnualEquivalente(taxaMensal: number): string {
  return taxaMensal > 0
    ? `≈ ${((Math.pow(1 + taxaMensal / 100, 12) - 1) * 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}% a.a.`
    : 'Taxa efetiva';
}

/** S14-03 — Rótulo do prazo: meses, anos redondos ou `"Xa Ym"`; `<= 0` → hint de máximo. */
export function formatarPrazoEmAnos(prazoMeses: number): string {
  if (prazoMeses <= 0) return 'Máx. 600 meses';
  const anos = Math.floor(prazoMeses / 12);
  const mesesRestantes = prazoMeses % 12;
  if (anos === 0) return `${mesesRestantes} ${mesesRestantes === 1 ? 'mês' : 'meses'}`;
  if (mesesRestantes === 0) return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  return `${anos}a ${mesesRestantes}m`;
}

/**
 * S14-03 — Percentual da entrada sobre o valor do imóvel
 * (`"X% do imóvel"`, pt-BR 0–1 casa); valores inválidos → `'Mín. 20%'`.
 */
export function calcularPercentualEntrada(valorImovel: number, entrada: number): string {
  return valorImovel > 0 && entrada > 0
    ? `${((entrada / valorImovel) * 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
      })}% do imóvel`
    : 'Mín. 20%';
}

/**
 * S14-03 — Preview do valor a financiar (`valorImovel - entrada`).
 * Regra dos 20%: `valorImovel > 0 && entrada >= 20% && entrada < valorImovel`;
 * fora da regra → `null` (preview oculto).
 */
export function calcularValorFinanciadoPreview(
  valorImovel: number,
  entrada: number
): number | null {
  return valorImovel > 0 && entrada >= valorImovel * 0.2 && entrada < valorImovel
    ? valorImovel - entrada
    : null;
}
