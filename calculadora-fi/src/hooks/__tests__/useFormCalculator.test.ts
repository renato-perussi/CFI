import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFormCalculator } from '../useFormCalculator';

describe('useFormCalculator', () => {
  it('deve iniciar com valores vazios e inválido', () => {
    const { result } = renderHook(() => useFormCalculator());

    expect(result.current.values).toEqual({
      valorImovel: '',
      entrada: '',
      taxaJuros: '',
      prazoMeses: '',
    });
    expect(result.current.isValid).toBe(false);
    expect(result.current.errors).toEqual({});
  });

  it('deve formatar campos e tornar formulário válido quando preenchido corretamente', () => {
    const { result } = renderHook(() => useFormCalculator());

    act(() => {
      result.current.handleChange('valorImovel', '30000000');
    });
    act(() => {
      result.current.handleChange('entrada', '6000000');
    });
    act(() => {
      result.current.handleChange('taxaJuros', '85');
    });
    act(() => {
      result.current.handleChange('prazoMeses', '360');
    });

    expect(result.current.values).toEqual({
      valorImovel: '300.000,00',
      entrada: '60.000,00',
      taxaJuros: '0,85',
      prazoMeses: '360',
    });
    expect(result.current.isValid).toBe(true);
  });

  it('deve atualizar erro de entrada quando valorImovel aumenta tornando a entrada insuficiente', () => {
    const { result } = renderHook(() => useFormCalculator());

    act(() => {
      result.current.handleChange('valorImovel', '10000000');
    });
    act(() => {
      result.current.handleChange('entrada', '2000000');
    });
    act(() => {
      result.current.handleChange('taxaJuros', '85');
    });
    act(() => {
      result.current.handleChange('prazoMeses', '360');
    });

    expect(result.current.isValid).toBe(true);
    expect(result.current.errors.entrada).toBeUndefined();

    act(() => {
      result.current.handleChange('valorImovel', '30000000');
    });

    expect(result.current.isValid).toBe(false);
    expect(result.current.errors.entrada).toContain('Entrada mínima de R$ 60.000,00 (20%)');

    act(() => {
      result.current.handleChange('valorImovel', '10000000');
    });

    expect(result.current.isValid).toBe(true);
    expect(result.current.errors.entrada).toBeUndefined();
  });

  it('deve rejeitar taxa de juros acima do limite máximo de 20% ao mês', () => {
    const { result } = renderHook(() => useFormCalculator());

    act(() => {
      result.current.handleChange('taxaJuros', '2500');
    });
    act(() => {
      result.current.handleBlur('taxaJuros');
    });

    expect(result.current.errors.taxaJuros).toBe('Taxa de juros máxima de 20% ao mês');
  });

  it('deve rejeitar entrada igual ou acima do valor do imóvel (borda)', () => {
    const { result } = renderHook(() => useFormCalculator());

    act(() => {
      result.current.handleChange('valorImovel', '10000000');
    });
    act(() => {
      result.current.handleChange('entrada', '10000000');
    });
    act(() => {
      result.current.handleChange('taxaJuros', '85');
    });
    act(() => {
      result.current.handleChange('prazoMeses', '360');
    });
    act(() => {
      result.current.handleBlur('entrada');
    });

    expect(result.current.isValid).toBe(false);
    expect(result.current.errors.entrada).toBe('Entrada deve ser menor que o valor do imóvel');

    act(() => {
      result.current.handleChange('entrada', '12000000');
    });
    act(() => {
      result.current.handleBlur('entrada');
    });

    expect(result.current.errors.entrada).toBe('Entrada deve ser menor que o valor do imóvel');
  });

  it('deve rejeitar prazo acima de 600 meses e exigir valor do imóvel (bordas)', () => {
    const { result } = renderHook(() => useFormCalculator());

    act(() => {
      result.current.handleChange('valorImovel', '30000000');
    });
    act(() => {
      result.current.handleChange('entrada', '6000000');
    });
    act(() => {
      result.current.handleChange('taxaJuros', '85');
    });
    act(() => {
      result.current.handleChange('prazoMeses', '601');
    });
    act(() => {
      result.current.handleBlur('prazoMeses');
    });

    expect(result.current.isValid).toBe(false);
    expect(result.current.errors.prazoMeses).toBe('Prazo máximo de 600 meses');
  });

  it('deve exigir valor do imóvel maior que zero quando vazio (borda valor<=0)', () => {
    const { result } = renderHook(() => useFormCalculator());

    act(() => {
      result.current.handleBlur('valorImovel');
    });

    expect(result.current.isValid).toBe(false);
    expect(result.current.errors.valorImovel).toBe('Valor do imóvel deve ser maior que zero');
  });

  it('deve chamar onSubmit com dados numéricos quando válido', () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useFormCalculator());

    act(() => {
      result.current.handleChange('valorImovel', '30000000');
    });
    act(() => {
      result.current.handleChange('entrada', '6000000');
    });
    act(() => {
      result.current.handleChange('taxaJuros', '85');
    });
    act(() => {
      result.current.handleChange('prazoMeses', '360');
    });

    act(() => {
      const submitHandler = result.current.handleSubmit(onSubmit);
      submitHandler({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      valorImovel: 300000,
      entrada: 60000,
      taxaJuros: 0.85,
      prazoMeses: 360,
    });
  });
});
