import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { gerarCSV, gerarCSVCompleto, downloadCSV } from '../csv';
import type { Parcela } from '../../types/financiamento';

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

describe('downloadCSV', () => {
  let clickSpy: ReturnType<typeof vi.fn>;
  let appendChildSpy: ReturnType<typeof vi.fn>;
  let removeChildSpy: ReturnType<typeof vi.fn>;
  let revokeObjectURLSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    clickSpy = vi.fn();
    appendChildSpy = vi.fn();
    removeChildSpy = vi.fn();
    revokeObjectURLSpy = vi.fn();

    vi.spyOn(document, 'createElement').mockReturnValue({
      href: '',
      download: '',
      style: { display: '' },
      click: clickSpy,
    } as unknown as HTMLAnchorElement);

    vi.spyOn(document.body, 'appendChild').mockImplementation(appendChildSpy as (node: Node) => Node);
    vi.spyOn(document.body, 'removeChild').mockImplementation(removeChildSpy as (child: Node) => Node);
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(revokeObjectURLSpy as (url: string) => void);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve criar blob com charset UTF-8 e BOM', () => {
    downloadCSV('test', 'file.csv');

    expect(URL.createObjectURL).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'text/csv;charset=utf-8;' })
    );
  });

  it('deve adicionar link ao body e clicar', () => {
    downloadCSV('test', 'file.csv');

    expect(appendChildSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
  });

  it('deve configurar nome do arquivo', () => {
    downloadCSV('test', 'financiamento.csv');

    const link = vi.mocked(document.createElement).mock.results[0].value;
    expect(link.download).toBe('financiamento.csv');
  });

  it('deve revogar URL do objeto', () => {
    downloadCSV('test', 'file.csv');

    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');
  });
});
