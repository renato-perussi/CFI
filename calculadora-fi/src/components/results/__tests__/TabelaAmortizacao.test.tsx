import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabelaAmortizacao } from '../TabelaAmortizacao';
import type { Parcela } from '../../../types/financiamento';

function criarParcelas(quantidade: number): Parcela[] {
  return Array.from({ length: quantidade }, (_, i) => ({
    mes: i + 1,
    amortizacao: 1000,
    juros: 500,
    parcela: 1500,
    saldoDevedor: Math.max((quantidade - (i + 1)) * 1000, 0),
  }));
}

describe('TabelaAmortizacao', () => {
  it('deve paginar 20 itens por página e resetar para a página 1 quando os dados mudarem', () => {
    const dados45 = criarParcelas(45);
    const { rerender } = render(<TabelaAmortizacao titulo="SAC" dados={dados45} />);

    expect(screen.getByText(/Página 1 de 3/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Próxima página/i }));
    fireEvent.click(screen.getByRole('button', { name: /Próxima página/i }));
    expect(screen.getByText(/Página 3 de 3/i)).toBeInTheDocument();

    const dados12 = criarParcelas(12);
    rerender(<TabelaAmortizacao titulo="SAC" dados={dados12} />);

    expect(screen.queryByText(/Página/i)).not.toBeInTheDocument();
    const linhas = screen.getAllByRole('row');
    expect(linhas).toHaveLength(13); // 1 header + 12 linhas de dados
  });
});
