import { describe, it, expect } from 'vitest';
import { gerarCSV, gerarCSVCompleto } from '../csv';
import type { Parcela } from '../../types/financing';

const tabelaMock: Parcela[] = [
  { mes: 1, amortizacao: 833.33, juros: 1000, parcela: 1833.33, saldoDevedor: 99166.67 },
  { mes: 2, amortizacao: 833.33, juros: 991.67, parcela: 1825, saldoDevedor: 98333.34 },
  { mes: 3, amortizacao: 833.33, juros: 983.33, parcela: 1816.66, saldoDevedor: 97500.01 },
];

describe('gerarCSV', () => {
  it('deve gerar CSV com cabeçalhos corretos', () => {
    const csv = gerarCSV(tabelaMock);

    expect(csv).toContain('Mês;Amortização;Juros;Parcela;Saldo Devedor');
  });

  it('deve gerar uma linha por parcela', () => {
    const csv = gerarCSV(tabelaMock);
    const linhas = csv.split('\n');

    expect(linhas).toHaveLength(4);
  });

  it('deve formatar valores com vírgula como decimal', () => {
    const csv = gerarCSV(tabelaMock);
    const linhas = csv.split('\n');
    const primeiraLinhaDados = linhas[1];

    expect(primeiraLinhaDados).toContain('833,33');
    expect(primeiraLinhaDados).toContain('1.000,00');
  });

  it('deve incluir título quando fornecido', () => {
    const csv = gerarCSV(tabelaMock, ';', 'SAC');

    expect(csv).toContain('SAC');
    expect(csv).toContain('Mês;Amortização');
  });

  it('deve usar separador personalizado', () => {
    const csv = gerarCSV(tabelaMock, ';');
    const linhas = csv.split('\n');
    const cabecalho = linhas[0];

    expect(cabecalho).toContain(';');
  });

  it('deve retornar apenas cabeçalhos para tabela vazia', () => {
    const csv = gerarCSV([]);
    const linhas = csv.split('\n');

    expect(linhas).toHaveLength(1);
    expect(linhas[0]).toBe('Mês;Amortização;Juros;Parcela;Saldo Devedor');
  });
});

describe('gerarCSVCompleto', () => {
  it('deve conter seções SAC e Price', () => {
    const csv = gerarCSVCompleto(tabelaMock, tabelaMock);

    expect(csv).toContain('SAC — Sistema de Amortização Constante');
    expect(csv).toContain('Price — Sistema de Tabela Price');
  });

  it('deve conter cabeçalhos duas vezes', () => {
    const csv = gerarCSVCompleto(tabelaMock, tabelaMock);
    const ocorrencias = (csv.match(/Mês;Amortização/g) || []).length;

    expect(ocorrencias).toBe(2);
  });
});
