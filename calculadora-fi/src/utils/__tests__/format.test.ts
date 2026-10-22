import { describe, it, expect } from 'vitest';
import {
  formatarMoeda,
  formatarMoedaCompacta,
  formatarNumero,
  formatarEntradaMoeda,
  formatarEntradaPercentual,
  formatarEntradaPrazo,
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
