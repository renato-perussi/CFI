import { describe, it, expect } from 'vitest';
import { calcularSAC, calcularPrice, calcularTotais, compararFinanciamentos } from '../calculos';
import type { Parcela } from '../../types/financiamento';

describe('calcularSAC', () => {
  it('deve calcular parcelas com amortização fixa decrescente', () => {
    const resultado = calcularSAC(100000, 1, 12);

    expect(resultado.tabela).toHaveLength(12);
    expect(resultado.parcelaInicial).toBeGreaterThan(resultado.parcelaFinal);
  });

  it('deve manter amortização constante nas parcelas e ajustar resíduo de centavos na última', () => {
    const resultado = calcularSAC(100000, 1, 12);
    const amortizacaoEsperada = Number((100000 / 12).toFixed(2));

    for (const parcela of resultado.tabela.slice(0, -1)) {
      expect(parcela.amortizacao).toBe(amortizacaoEsperada);
    }

    const somaAmortizacoes = Number(
      resultado.tabela.reduce((acc, p) => acc + p.amortizacao, 0).toFixed(2)
    );
    expect(somaAmortizacoes).toBe(100000);
  });

  it('deve calcular juros sobre saldo devedor', () => {
    const resultado = calcularSAC(100000, 1, 12);

    expect(resultado.tabela[0].juros).toBe(1000);
    expect(resultado.tabela[1].juros).toBeCloseTo(916.67, 0);
  });

  it('deve zerar saldo devedor na última parcela', () => {
    const resultado = calcularSAC(100000, 1, 12);
    const ultimaParcela = resultado.tabela[resultado.tabela.length - 1];

    expect(ultimaParcela.saldoDevedor).toBe(0);
  });

  it('deve retornar total pago e total juros corretos', () => {
    const resultado = calcularSAC(100000, 1, 12);

    expect(resultado.totalPago).toBeGreaterThan(100000);
    expect(resultado.totalJuros).toBeGreaterThan(0);
    expect(resultado.totalPago).toBeCloseTo(100000 + resultado.totalJuros, 0);
  });

  it('deve calcular corretamente com taxa zero', () => {
    const resultado = calcularSAC(100000, 0, 10);

    expect(resultado.totalJuros).toBe(0);
    expect(resultado.totalPago).toBe(100000);
    expect(resultado.parcelaInicial).toBe(10000);
    expect(resultado.parcelaFinal).toBe(10000);
  });
});

describe('calcularPrice', () => {
  it('deve calcular parcelas de valor fixo e ajustar resíduo de centavos na última', () => {
    const resultado = calcularPrice(100000, 1, 12);

    expect(resultado.tabela).toHaveLength(12);

    for (const parcela of resultado.tabela.slice(0, -1)) {
      expect(parcela.parcela).toBe(resultado.parcelaInicial);
    }

    const somaAmortizacoes = Number(
      resultado.tabela.reduce((acc, p) => acc + p.amortizacao, 0).toFixed(2)
    );
    expect(somaAmortizacoes).toBe(100000);
  });

  it('deve calcular juros decrescentes e amortização crescente', () => {
    const resultado = calcularPrice(100000, 1, 12);

    for (let i = 1; i < resultado.tabela.length; i++) {
      expect(resultado.tabela[i].juros).toBeLessThan(resultado.tabela[i - 1].juros);
      expect(resultado.tabela[i].amortizacao).toBeGreaterThan(resultado.tabela[i - 1].amortizacao);
    }
  });

  it('deve zerar saldo devedor na última parcela', () => {
    const resultado = calcularPrice(100000, 1, 12);
    const ultimaParcela = resultado.tabela[resultado.tabela.length - 1];

    expect(ultimaParcela.saldoDevedor).toBe(0);
  });

  it('deve retornar total pago e total juros corretos', () => {
    const resultado = calcularPrice(100000, 1, 12);

    expect(resultado.totalPago).toBeGreaterThan(100000);
    expect(resultado.totalJuros).toBeGreaterThan(0);
    expect(resultado.totalPago).toBeCloseTo(100000 + resultado.totalJuros, 0);
  });

  it('deve calcular corretamente com taxa zero', () => {
    const resultado = calcularPrice(100000, 0, 10);

    expect(resultado.totalJuros).toBe(0);
    expect(resultado.totalPago).toBe(100000);
    expect(resultado.parcelaInicial).toBe(10000);
    expect(resultado.parcelaFinal).toBe(10000);
  });

  it('deve gerar parcela fixa consistente com fórmula Price', () => {
    const valorFinanciado = 100000;
    const taxa = 1;
    const prazo = 12;
    const resultado = calcularPrice(valorFinanciado, taxa, prazo);

    const i = taxa / 100;
    const fator = Math.pow(1 + i, prazo);
    const esperado = valorFinanciado * ((i * fator) / (fator - 1));

    expect(resultado.parcelaInicial).toBeCloseTo(esperado, 0);
  });
});

describe('calcularTotais', () => {
  it('deve calcular totais a partir de uma tabela', () => {
    const tabela: Parcela[] = [
      { mes: 1, amortizacao: 500, juros: 100, parcela: 600, saldoDevedor: 9500 },
      { mes: 2, amortizacao: 500, juros: 95, parcela: 595, saldoDevedor: 9000 },
      { mes: 3, amortizacao: 500, juros: 90, parcela: 590, saldoDevedor: 8500 },
    ];

    const resultado = calcularTotais(tabela);

    expect(resultado.totalPago).toBe(1785);
    expect(resultado.totalJuros).toBe(285);
    expect(resultado.parcelaInicial).toBe(600);
    expect(resultado.parcelaFinal).toBe(590);
    expect(resultado.tabela).toBe(tabela);
  });

  it('deve retornar zeros para tabela vazia', () => {
    const resultado = calcularTotais([]);

    expect(resultado.totalPago).toBe(0);
    expect(resultado.totalJuros).toBe(0);
    expect(resultado.parcelaInicial).toBe(0);
    expect(resultado.parcelaFinal).toBe(0);
    expect(resultado.tabela).toHaveLength(0);
  });
});

describe('compararFinanciamentos', () => {
  it('deve indicar SAC como melhor quando total SAC é menor', () => {
    const resultadoSAC = {
      totalPago: 110000,
      totalJuros: 10000,
      parcelaInicial: 9500,
      parcelaFinal: 8500,
      tabela: [],
    };
    const resultadoPrice = {
      totalPago: 115000,
      totalJuros: 15000,
      parcelaInicial: 9583,
      parcelaFinal: 9583,
      tabela: [],
    };

    const comparacao = compararFinanciamentos(resultadoSAC, resultadoPrice);

    expect(comparacao.melhorOpcao).toBe('SAC');
    expect(comparacao.economia).toBe(5000);
  });

  it('deve indicar Price como melhor quando total Price é menor', () => {
    const resultadoSAC = {
      totalPago: 115000,
      totalJuros: 15000,
      parcelaInicial: 9500,
      parcelaFinal: 8500,
      tabela: [],
    };
    const resultadoPrice = {
      totalPago: 110000,
      totalJuros: 10000,
      parcelaInicial: 9583,
      parcelaFinal: 9583,
      tabela: [],
    };

    const comparacao = compararFinanciamentos(resultadoSAC, resultadoPrice);

    expect(comparacao.melhorOpcao).toBe('PRICE');
    expect(comparacao.economia).toBe(5000);
  });

  it('deve indicar SAC quando totais são iguais', () => {
    const resultado = {
      totalPago: 110000,
      totalJuros: 10000,
      parcelaInicial: 9500,
      parcelaFinal: 8500,
      tabela: [],
    };

    const comparacao = compararFinanciamentos(resultado, resultado);

    expect(comparacao.melhorOpcao).toBe('SAC');
    expect(comparacao.economia).toBe(0);
  });
});

describe('integração SAC vs Price', () => {
  it('SAC deve ter parcela inicial maior e final menor que Price', () => {
    const sac = calcularSAC(100000, 1, 12);
    const price = calcularPrice(100000, 1, 12);

    expect(sac.parcelaInicial).toBeGreaterThan(price.parcelaInicial);
    expect(sac.parcelaFinal).toBeLessThan(price.parcelaFinal);
  });

  it('SAC sempre deve ter menos juros totais que Price', () => {
    const sac = calcularSAC(200000, 0.8, 24);
    const price = calcularPrice(200000, 0.8, 24);

    expect(sac.totalJuros).toBeLessThan(price.totalJuros);
  });

  it('deve funcionar com diferentes prazos e taxas', () => {
    const cenarios = [
      { valor: 50000, taxa: 0.5, prazo: 6 },
      { valor: 300000, taxa: 1.2, prazo: 360 },
      { valor: 150000, taxa: 0.75, prazo: 180 },
    ];

    for (const cenario of cenarios) {
      const sac = calcularSAC(cenario.valor, cenario.taxa, cenario.prazo);
      const price = calcularPrice(cenario.valor, cenario.taxa, cenario.prazo);

      expect(sac.tabela).toHaveLength(cenario.prazo);
      expect(price.tabela).toHaveLength(cenario.prazo);
      expect(Number((sac.totalPago - sac.totalJuros).toFixed(2))).toBe(cenario.valor);
      expect(Number((price.totalPago - price.totalJuros).toFixed(2))).toBe(cenario.valor);

      for (const p of sac.tabela) {
        expect(Number((p.amortizacao + p.juros).toFixed(2))).toBe(p.parcela);
      }
      for (const p of price.tabela) {
        expect(Number((p.amortizacao + p.juros).toFixed(2))).toBe(p.parcela);
      }
    }
  });

  it('não deve gerar NaN ou Infinity na Tabela Price com taxas extremas', () => {
    const resultado = calcularPrice(100000, 250, 600);

    expect(Number.isFinite(resultado.totalPago)).toBe(true);
    expect(Number.isFinite(resultado.totalJuros)).toBe(true);
    expect(Number.isFinite(resultado.parcelaInicial)).toBe(true);
  });
});
