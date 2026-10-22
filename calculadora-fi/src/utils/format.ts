export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatarMoedaCompacta(valor: number): string {
  const abs = Math.abs(valor);
  if (abs >= 1_000_000) {
    return `R$ ${(valor / 1_000_000).toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    })} mi`;
  }
  if (abs >= 10_000) {
    return `R$ ${(valor / 1_000).toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} mil`;
  }
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatarNumero(valor: number): string {
  return valor.toLocaleString('pt-BR');
}

export function formatarEntradaMoeda(valor: string): string {
  const apenasDigitos = valor.replace(/\D/g, '').slice(0, 11);

  if (!apenasDigitos) return '';

  const valorNumerico = parseInt(apenasDigitos, 10);
  if (!valorNumerico) return '';

  const valorEmReais = valorNumerico / 100;

  return valorEmReais.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatarEntradaPercentual(valor: string): string {
  const apenasDigitos = valor.replace(/\D/g, '').slice(0, 5);

  if (!apenasDigitos) return '';

  const valorNumerico = parseInt(apenasDigitos, 10);
  if (valorNumerico === 0 && valor !== '0' && valor !== '0,00') {
    return '';
  }

  const valorFormatado = (valorNumerico / 100).toFixed(2).replace('.', ',');

  return valorFormatado;
}

export function formatarEntradaPrazo(valor: string): string {
  const apenasDigitos = valor.replace(/\D/g, '').replace(/^0+/, '');
  return apenasDigitos;
}

/**
 * Sprint 15 — Parsing Único (RFR-003).
 *
 * Inversas exatas das máscaras `/100` (`formatarEntradaMoeda` /
 * `formatarEntradaPercentual`). Centralizam todo o parsing de moeda/percentual
 * do app: fora deste arquivo não deve existir parsing manual de ponto de
 * milhar (critério S15-02, verificado via `rg`).
 *
 * - `''` (campo vazio) → `NaN`. Chamadores convertem com `|| 0` quando
 *   precisam de zero (ex.: previews) ou checam `!campo`/`isNaN` antes
 *   (ex.: validação — `'Campo obrigatório'`). O `NaN` é o que a Sprint 16
 *   (`domain/validacao.ts`) espera para campo vazio.
 * - `'0,00'` → `0`.
 */
export function parseMoedaParaNumero(valor: string): number {
  if (!valor) return NaN;
  return parseFloat(valor.replace(/\./g, '').replace(',', '.'));
}

export function parsePercentualParaNumero(valor: string): number {
  if (!valor) return NaN;
  return parseFloat(valor.replace(',', '.'));
}

/**
 * Sprint 15 — Formatação percentual central (RFR-003).
 *
 * Substitui os `toLocaleString('pt-BR', …)` ad-hoc espalhados por
 * `analise.ts`/componentes. `casas` é o máximo de casas decimais;
 * `minimo` (padrão = `casas`) é o mínimo — necessário porque os
 * comportamentos travados divergem: economia exige mín 1 (`"10,0"`,
 * `ComparacaoFinanciamento`), entrada exige mín 0 (`"20%"`, `FormCalculator`).
 */
export function formatarPercentual(valor: number, casas = 1, minimo: number = casas): string {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: minimo,
    maximumFractionDigits: casas,
  });
}
