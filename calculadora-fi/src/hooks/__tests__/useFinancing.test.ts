import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFinanciamento } from '../useFinancing';

describe('useFinanciamento', () => {
  it('deve calcular o resultado da simulação', () => {
    const { result } = renderHook(() => useFinanciamento());

    expect(result.current.resultado).toBeNull();

    act(() => {
      result.current.calcular({
        valorImovel: 300000,
        entrada: 60000,
        taxaJuros: 0.85,
        prazoMeses: 120,
      });
    });

    expect(result.current.resultado).not.toBeNull();
    expect(result.current.resultado?.melhorOpcao).toBe('SAC');
    expect(result.current.resultado?.resultadoSAC.tabela).toHaveLength(120);
  });
});
