/**
 * Caracterização: trava o comportamento dos derivados de UI
 * (cruzamento SAC/Price, % economia, principal, taxa anual,
 * rótulo de prazo, % entrada, preview do financiado).
 */
import { describe, it, expect } from 'vitest';
import {
  calcularMesCruzamento,
  calcularPercentualEconomia,
  calcularValorPrincipal,
  calcularTaxaAnualEquivalente,
  formatarPrazoEmAnos,
  calcularPercentualEntrada,
  calcularValorFinanciadoPreview,
} from '../analise';
import { calcularSAC, calcularPrice, compararFinanciamentos } from '../calculos';
import type { Parcela } from '../../types/financiamento';

function tabelaSintetica(parcelas: number[]): Parcela[] {
  return parcelas.map((parcela, i) => ({
    mes: i + 1,
    amortizacao: 0,
    juros: 0,
    parcela,
    saldoDevedor: 0,
  }));
}

describe('calcularMesCruzamento (ComparacaoFinanciamento.tsx:19-28)', () => {
  it('retorna o mês em que a parcela SAC cruza para baixo da Price (caso sintético → mês 2)', () => {
    const sac = tabelaSintetica([1000, 600, 500]);
    const price = tabelaSintetica([700, 700, 700]);

    expect(calcularMesCruzamento(sac, price)).toBe(2);
  });

  it('retorna o mês 1 quando a primeira parcela SAC já é menor ou igual (taxa zero, economia=0)', () => {
    const sac = calcularSAC(100000, 0, 12);
    const price = calcularPrice(100000, 0, 12);
    const comparacao = compararFinanciamentos(sac, price);

    expect(comparacao.economia).toBe(0);
    expect(calcularMesCruzamento(sac.tabela, price.tabela)).toBe(1);
  });

  it('retorna null quando SAC nunca fica menor ou igual à Price', () => {
    const sac = tabelaSintetica([1000, 900, 800]);
    const price = tabelaSintetica([500, 500, 500]);

    expect(calcularMesCruzamento(sac, price)).toBeNull();
  });

  it('retorna null para tabelas vazias', () => {
    expect(calcularMesCruzamento([], [])).toBeNull();
  });

  it('integração real 400k/0,85%/360 → mês 101 (trava comportamento atual)', () => {
    const sac = calcularSAC(400000, 0.85, 360);
    const price = calcularPrice(400000, 0.85, 360);

    expect(sac.tabela[0].parcela).toBeGreaterThan(price.tabela[0].parcela);
    expect(calcularMesCruzamento(sac.tabela, price.tabela)).toBe(101);
  });

  it('integração real 100k/1%/12 → mês 7', () => {
    const sac = calcularSAC(100000, 1, 12);
    const price = calcularPrice(100000, 1, 12);

    expect(calcularMesCruzamento(sac.tabela, price.tabela)).toBe(7);
  });
});

describe('calcularPercentualEconomia (ComparacaoFinanciamento.tsx:30-37)', () => {
  it('formata com 1 casa decimal pt-BR (5000/115000 → "4,3")', () => {
    expect(calcularPercentualEconomia(5000, 115000)).toBe('4,3');
  });

  it('retorna "10,0" para 10000/100000', () => {
    expect(calcularPercentualEconomia(10000, 100000)).toBe('10,0');
  });

  it('retorna "0,0" quando economia é zero', () => {
    expect(calcularPercentualEconomia(0, 115000)).toBe('0,0');
  });

  it('retorna "0,0" quando maiorTotal é zero (guarda divisão por zero)', () => {
    expect(calcularPercentualEconomia(5000, 0)).toBe('0,0');
  });

  it('integração real 400k/0,85%/360 → "21,1"', () => {
    const sac = calcularSAC(400000, 0.85, 360);
    const price = calcularPrice(400000, 0.85, 360);
    const { economia } = compararFinanciamentos(sac, price);
    const maiorTotal = Math.max(sac.totalPago, price.totalPago);

    expect(calcularPercentualEconomia(economia, maiorTotal)).toBe('21,1');
  });
});

describe('calcularValorPrincipal (ResultadoHeader.tsx:19-25)', () => {
  it('retorna totalPago menos totalJuros com 2 casas', () => {
    expect(calcularValorPrincipal(500000, 100000)).toBe(400000);
  });

  it('recompõe o financiado a partir de calcularTotais (1785-285 → 1500)', () => {
    expect(calcularValorPrincipal(1785, 285)).toBe(1500);
  });

  it('retorna 0 quando totalJuros iguala totalPago', () => {
    expect(calcularValorPrincipal(100000, 100000)).toBe(0);
  });

  it('trava em 0 quando juros superam o total (nunca negativo)', () => {
    expect(calcularValorPrincipal(50000, 80000)).toBe(0);
  });

  it('integração: principal recompõe o valor financiado (100k/1%/12)', () => {
    const sac = calcularSAC(100000, 1, 12);

    expect(calcularValorPrincipal(sac.totalPago, sac.totalJuros)).toBe(100000);
  });
});

describe('calcularTaxaAnualEquivalente (FormCalculator.tsx:42-48)', () => {
  it('retorna "Taxa efetiva" quando taxa mensal é zero', () => {
    expect(calcularTaxaAnualEquivalente(0)).toBe('Taxa efetiva');
  });

  it('converte 0,85% a.m. → "≈ 10,69% a.a."', () => {
    expect(calcularTaxaAnualEquivalente(0.85)).toBe('≈ 10,69% a.a.');
  });

  it('converte 0,9% a.m. → "≈ 11,35% a.a."', () => {
    expect(calcularTaxaAnualEquivalente(0.9)).toBe('≈ 11,35% a.a.');
  });

  it('converte 1% a.m. → "≈ 12,68% a.a."', () => {
    expect(calcularTaxaAnualEquivalente(1)).toBe('≈ 12,68% a.a.');
  });
});

describe('formatarPrazoEmAnos (FormCalculator.tsx:50-57)', () => {
  it('retorna "Máx. 600 meses" para prazo zerado ou negativo', () => {
    expect(formatarPrazoEmAnos(0)).toBe('Máx. 600 meses');
    expect(formatarPrazoEmAnos(-5)).toBe('Máx. 600 meses');
  });

  it('singulariza mês e ano', () => {
    expect(formatarPrazoEmAnos(1)).toBe('1 mês');
    expect(formatarPrazoEmAnos(12)).toBe('1 ano');
  });

  it('pluraliza meses e anos redondos', () => {
    expect(formatarPrazoEmAnos(5)).toBe('5 meses');
    expect(formatarPrazoEmAnos(24)).toBe('2 anos');
    expect(formatarPrazoEmAnos(360)).toBe('30 anos');
  });

  it('combina anos e meses restantes ("10a 5m")', () => {
    expect(formatarPrazoEmAnos(125)).toBe('10a 5m');
    expect(formatarPrazoEmAnos(13)).toBe('1a 1m');
    expect(formatarPrazoEmAnos(370)).toBe('30a 10m');
  });
});

describe('calcularPercentualEntrada (FormCalculator.tsx:34-40)', () => {
  it('formata 100k/500k → "20% do imóvel"', () => {
    expect(calcularPercentualEntrada(500000, 100000)).toBe('20% do imóvel');
  });

  it('formata 150k/500k → "30% do imóvel"', () => {
    expect(calcularPercentualEntrada(500000, 150000)).toBe('30% do imóvel');
  });

  it('formata dízima com 1 casa pt-BR (100k/300k → "33,3% do imóvel")', () => {
    expect(calcularPercentualEntrada(300000, 100000)).toBe('33,3% do imóvel');
  });

  it('retorna "Mín. 20%" quando imóvel ou entrada são zerados', () => {
    expect(calcularPercentualEntrada(0, 50000)).toBe('Mín. 20%');
    expect(calcularPercentualEntrada(500000, 0)).toBe('Mín. 20%');
    expect(calcularPercentualEntrada(0, 0)).toBe('Mín. 20%');
  });
});

describe('calcularValorFinanciadoPreview — regra 20% (FormCalculator.tsx:59-62)', () => {
  it('retorna valorImovel menos entrada no limite exato de 20%', () => {
    expect(calcularValorFinanciadoPreview(500000, 100000)).toBe(400000);
  });

  it('retorna a diferença para entrada acima de 20%', () => {
    expect(calcularValorFinanciadoPreview(500000, 150000)).toBe(350000);
    expect(calcularValorFinanciadoPreview(300000, 60000)).toBe(240000);
  });

  it('retorna null abaixo de 20% (regra mínima)', () => {
    expect(calcularValorFinanciadoPreview(500000, 99999)).toBeNull();
  });

  it('retorna null quando entrada atinge ou supera o valor do imóvel', () => {
    expect(calcularValorFinanciadoPreview(500000, 500000)).toBeNull();
    expect(calcularValorFinanciadoPreview(500000, 600000)).toBeNull();
  });

  it('retorna null quando valores são zerados', () => {
    expect(calcularValorFinanciadoPreview(0, 0)).toBeNull();
    expect(calcularValorFinanciadoPreview(500000, 0)).toBeNull();
  });

  it('preview de 400k/500k corresponde a 80% do imóvel (rótulo atual usa toFixed(0))', () => {
    const preview = calcularValorFinanciadoPreview(500000, 100000);

    expect(preview).toBe(400000);
    expect((((preview as number) / 500000) * 100).toFixed(0)).toBe('80');
  });
});
