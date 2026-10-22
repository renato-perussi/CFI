import { describe, it, expect } from 'vitest';
import {
  formatarMoeda,
  formatarMoedaCompacta,
  formatarNumero,
  formatarEntradaMoeda,
  formatarEntradaPercentual,
  formatarEntradaPrazo,
  parseMoedaParaNumero,
  parsePercentualParaNumero,
  formatarPercentual,
} from '../format';

describe('formatarMoeda', () => {
  it('deve formatar valores em Real brasileiro', () => {
    expect(formatarMoeda(1500.5)).toContain('1.500,50');
  });
});

describe('formatarMoedaCompacta', () => {
  it('deve formatar milhões com sufixo mi', () => {
    expect(formatarMoedaCompacta(1500000)).toContain('1,5 mi');
  });

  it('deve formatar dezenas de milhares com sufixo mil', () => {
    expect(formatarMoedaCompacta(25000)).toContain('25 mil');
  });

  it('deve formatar valores menores que 10 mil como moeda sem centavos', () => {
    expect(formatarMoedaCompacta(950)).toContain('950');
  });
});

describe('formatarNumero', () => {
  it('deve formatar número com separador de milhar pt-BR', () => {
    expect(formatarNumero(1234)).toBe('1.234');
  });
});

describe('formatarEntradaMoeda', () => {
  it('deve formatar dígitos para máscara monetária', () => {
    expect(formatarEntradaMoeda('30000000')).toBe('300.000,00');
  });

  it('deve retornar string vazia quando não houver dígitos ou valor for zero (Backspace em 0,01)', () => {
    expect(formatarEntradaMoeda('')).toBe('');
    expect(formatarEntradaMoeda('0')).toBe('');
    expect(formatarEntradaMoeda('0,0')).toBe('');
    expect(formatarEntradaMoeda('00')).toBe('');
  });
});

describe('formatarEntradaPercentual', () => {
  it('deve formatar dígitos para percentual com 2 casas decimais', () => {
    expect(formatarEntradaPercentual('85')).toBe('0,85');
    expect(formatarEntradaPercentual('125')).toBe('1,25');
  });

  it('deve permitir digitar 0 para taxa zero', () => {
    expect(formatarEntradaPercentual('0')).toBe('0,00');
    expect(formatarEntradaPercentual('0,00')).toBe('0,00');
  });

  it('deve limpar o campo ao pressionar Backspace em 0,01 ou 0,00', () => {
    expect(formatarEntradaPercentual('0,0')).toBe('');
    expect(formatarEntradaPercentual('')).toBe('');
  });
});

describe('formatarEntradaPrazo', () => {
  it('deve manter apenas dígitos e remover zeros à esquerda', () => {
    expect(formatarEntradaPrazo('360')).toBe('360');
    expect(formatarEntradaPrazo('036')).toBe('36');
    expect(formatarEntradaPrazo('000')).toBe('');
    expect(formatarEntradaPrazo('abc120')).toBe('120');
  });
});

describe('parseMoedaParaNumero (inversa da máscara /100)', () => {
  it('deve converter moeda mascarada pt-BR em número', () => {
    expect(parseMoedaParaNumero('300.000,00')).toBe(300000);
    expect(parseMoedaParaNumero('60.000,00')).toBe(60000);
    expect(parseMoedaParaNumero('1.500,50')).toBe(1500.5);
  });

  it('deve retornar 0 para "0,00"', () => {
    expect(parseMoedaParaNumero('0,00')).toBe(0);
  });

  it('deve retornar NaN para string vazia (campo vazio)', () => {
    expect(parseMoedaParaNumero('')).toBeNaN();
  });

  it('round-trip: máscara → parse recompõe o valor original', () => {
    expect(parseMoedaParaNumero(formatarEntradaMoeda('30000000'))).toBe(300000);
    expect(parseMoedaParaNumero(formatarEntradaMoeda('6000000'))).toBe(60000);
  });
});

describe('parsePercentualParaNumero (inversa da máscara /100)', () => {
  it('deve converter percentual mascarado pt-BR em número', () => {
    expect(parsePercentualParaNumero('0,85')).toBe(0.85);
    expect(parsePercentualParaNumero('1,25')).toBe(1.25);
  });

  it('deve aceitar dígitos crus com zero à esquerda (085 → 0,85 mascarado)', () => {
    expect(formatarEntradaPercentual('085')).toBe('0,85');
    expect(parsePercentualParaNumero(formatarEntradaPercentual('085'))).toBe(0.85);
  });

  it('deve retornar 0 para "0,00"', () => {
    expect(parsePercentualParaNumero('0,00')).toBe(0);
  });

  it('deve retornar NaN para string vazia (campo vazio)', () => {
    expect(parsePercentualParaNumero('')).toBeNaN();
  });

  it('round-trip: máscara → parse recompõe o valor original', () => {
    expect(parsePercentualParaNumero(formatarEntradaPercentual('85'))).toBe(0.85);
    expect(parsePercentualParaNumero(formatarEntradaPercentual('125'))).toBe(1.25);
  });
});

describe('formatarPercentual', () => {
  it('padrão 1 casa com mínimo 1 (economia: 4,3 / 10,0 / 0,0)', () => {
    expect(formatarPercentual(4.3478)).toBe('4,3');
    expect(formatarPercentual(10)).toBe('10,0');
    expect(formatarPercentual(0)).toBe('0,0');
  });

  it('2 casas (taxa anual: 10,69)', () => {
    expect(formatarPercentual(10.6907, 2)).toBe('10,69');
    expect(formatarPercentual(12.6825, 2)).toBe('12,68');
  });

  it('0 casas sem agrupar (preview: 80)', () => {
    expect(formatarPercentual(80, 0)).toBe('80');
    expect(formatarPercentual(33.333, 0)).toBe('33');
  });

  it('mínimo 0 com máximo 1 (entrada: 20 / 33,3)', () => {
    expect(formatarPercentual(20, 1, 0)).toBe('20');
    expect(formatarPercentual(33.333, 1, 0)).toBe('33,3');
  });
});
