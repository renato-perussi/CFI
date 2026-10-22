/**
 * Sprint 13 — Trava de Segurança (caracterização, RED).
 *
 * Espelha as mensagens pt-BR atuais do `useFormCalculator.validate`
 * (`src/hooks/useFormCalculator.ts:34-77`) como baseline para a extração do
 * validador puro na Sprint 16 (RFR-004). NENHUM arquivo produtivo muda aqui.
 *
 * Estes testes importam de `../validacao` (`src/domain/validacao.ts`), módulo
 * que ainda NÃO existe — estado esperado: FAIL por "Failed to resolve import",
 * com os 53 testes existentes em PASS.
 *
 * Contrato travado (assinatura-alvo Sprint 16):
 * `validateFinanciamento({ valorImovel, entrada, taxaJuros, prazoMeses }, minimoFormatado?)`
 * - Recebe NÚMEROS já parseados (máscara resolvida no hook via `format.ts`).
 * - `NaN` representa campo vazio (ex.: `parseFloat('')`) → `'Campo obrigatório'`,
 *   exceto `valorImovel`, que hoje responde `'Valor do imóvel deve ser maior que zero'`.
 * - `minimoFormatado` (ex.: `'60.000,00'`) é fornecido pelo hook para compor
 *   `'Entrada mínima de R$ 60.000,00 (20%)'` sem importar `format.ts` no domínio.
 * - Mensagens idênticas às atuais; guarda `valorImovel > 0` antes da regra de 20%.
 */
import { describe, it, expect } from 'vitest';
import { validateFinanciamento } from '../validacao';

const VALIDO = {
  valorImovel: 500000,
  entrada: 100000,
  taxaJuros: 0.85,
  prazoMeses: 360,
};

describe('validateFinanciamento — baseline mensagens pt-BR (useFormCalculator.ts:34-77)', () => {
  it('retorna sem erros para dados válidos (20% exatos de entrada)', () => {
    expect(validateFinanciamento(VALIDO)).toEqual({});
  });

  it('valor zerado/negativo/NaN → "Valor do imóvel deve ser maior que zero"', () => {
    expect(validateFinanciamento({ ...VALIDO, valorImovel: 0 }).valorImovel).toBe(
      'Valor do imóvel deve ser maior que zero'
    );
    expect(validateFinanciamento({ ...VALIDO, valorImovel: -1 }).valorImovel).toBe(
      'Valor do imóvel deve ser maior que zero'
    );
    expect(validateFinanciamento({ ...VALIDO, valorImovel: NaN }).valorImovel).toBe(
      'Valor do imóvel deve ser maior que zero'
    );
  });

  it('entrada vazia (NaN) → "Campo obrigatório"', () => {
    expect(validateFinanciamento({ ...VALIDO, entrada: NaN }).entrada).toBe('Campo obrigatório');
  });

  it('entrada negativa → "Entrada deve ser maior ou igual a zero"', () => {
    expect(validateFinanciamento({ ...VALIDO, entrada: -100 }).entrada).toBe(
      'Entrada deve ser maior ou igual a zero'
    );
  });

  it('entrada abaixo de 20% com mínimo formatado → mensagem exata (500k/50k)', () => {
    expect(validateFinanciamento({ ...VALIDO, entrada: 50000 }, '100.000,00').entrada).toBe(
      'Entrada mínima de R$ 100.000,00 (20%)'
    );
  });

  it('entrada abaixo de 20% com mínimo formatado → mensagem exata (300k/20k)', () => {
    expect(
      validateFinanciamento(
        { valorImovel: 300000, entrada: 20000, taxaJuros: 0.85, prazoMeses: 360 },
        '60.000,00'
      ).entrada
    ).toBe('Entrada mínima de R$ 60.000,00 (20%)');
  });

  it('entrada abaixo de 20% sem mínimo formatado ainda exige "Entrada mínima ... (20%)"', () => {
    const erro = validateFinanciamento({ ...VALIDO, entrada: 50000 }).entrada;

    expect(erro).toContain('Entrada mínima');
    expect(erro).toContain('(20%)');
  });

  it('entrada exatamente em 20% é válida (fronteira inclusiva)', () => {
    expect(validateFinanciamento({ ...VALIDO, entrada: 100000 }).entrada).toBeUndefined();
  });

  it('entrada igual ou acima do valor do imóvel → "Entrada deve ser menor que o valor do imóvel"', () => {
    expect(validateFinanciamento({ ...VALIDO, entrada: 500000 }).entrada).toBe(
      'Entrada deve ser menor que o valor do imóvel'
    );
    expect(validateFinanciamento({ ...VALIDO, entrada: 600000 }).entrada).toBe(
      'Entrada deve ser menor que o valor do imóvel'
    );
  });

  it('regra de 20% não se aplica quando valor do imóvel é inválido (guarda valorImovel > 0)', () => {
    const erros = validateFinanciamento({
      valorImovel: 0,
      entrada: 10,
      taxaJuros: 0.85,
      prazoMeses: 360,
    });

    expect(erros.valorImovel).toBe('Valor do imóvel deve ser maior que zero');
    expect(erros.entrada).toBeUndefined();
  });

  it('revalidação cruzada: entrada válida vira insuficiente ao subir o valor do imóvel', () => {
    const antes = validateFinanciamento({
      valorImovel: 100000,
      entrada: 20000,
      taxaJuros: 0.85,
      prazoMeses: 360,
    });
    const depois = validateFinanciamento(
      {
        valorImovel: 300000,
        entrada: 20000,
        taxaJuros: 0.85,
        prazoMeses: 360,
      },
      '60.000,00'
    );

    expect(antes.entrada).toBeUndefined();
    expect(depois.entrada).toBe('Entrada mínima de R$ 60.000,00 (20%)');
  });

  it('taxa vazia (NaN) → "Campo obrigatório"', () => {
    expect(validateFinanciamento({ ...VALIDO, taxaJuros: NaN }).taxaJuros).toBe(
      'Campo obrigatório'
    );
  });

  it('taxa negativa → "Taxa de juros deve ser maior ou igual a zero"', () => {
    expect(validateFinanciamento({ ...VALIDO, taxaJuros: -0.5 }).taxaJuros).toBe(
      'Taxa de juros deve ser maior ou igual a zero'
    );
  });

  it('taxa acima de 20 → "Taxa de juros máxima de 20% ao mês"', () => {
    expect(validateFinanciamento({ ...VALIDO, taxaJuros: 20.01 }).taxaJuros).toBe(
      'Taxa de juros máxima de 20% ao mês'
    );
    expect(validateFinanciamento({ ...VALIDO, taxaJuros: 25 }).taxaJuros).toBe(
      'Taxa de juros máxima de 20% ao mês'
    );
  });

  it('taxa zero e taxa 20 são válidas (fronteiras inclusivas)', () => {
    expect(validateFinanciamento({ ...VALIDO, taxaJuros: 0 }).taxaJuros).toBeUndefined();
    expect(validateFinanciamento({ ...VALIDO, taxaJuros: 20 }).taxaJuros).toBeUndefined();
  });

  it('prazo vazio (NaN) → "Campo obrigatório"', () => {
    expect(validateFinanciamento({ ...VALIDO, prazoMeses: NaN }).prazoMeses).toBe(
      'Campo obrigatório'
    );
  });

  it('prazo zerado/negativo → "Prazo deve ser maior que zero"', () => {
    expect(validateFinanciamento({ ...VALIDO, prazoMeses: 0 }).prazoMeses).toBe(
      'Prazo deve ser maior que zero'
    );
    expect(validateFinanciamento({ ...VALIDO, prazoMeses: -12 }).prazoMeses).toBe(
      'Prazo deve ser maior que zero'
    );
  });

  it('prazo acima de 600 → "Prazo máximo de 600 meses"', () => {
    expect(validateFinanciamento({ ...VALIDO, prazoMeses: 601 }).prazoMeses).toBe(
      'Prazo máximo de 600 meses'
    );
    expect(validateFinanciamento({ ...VALIDO, prazoMeses: 1000 }).prazoMeses).toBe(
      'Prazo máximo de 600 meses'
    );
  });

  it('prazo 600 é válido (fronteira inclusiva)', () => {
    expect(validateFinanciamento({ ...VALIDO, prazoMeses: 600 }).prazoMeses).toBeUndefined();
  });
});
