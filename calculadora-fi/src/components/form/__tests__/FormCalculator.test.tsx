import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormCalculator } from '../FormCalculator';

describe('FormCalculator', () => {
  it('deve renderizar os 4 campos com inputMode="numeric" e somente o botão Calcular', () => {
    render(<FormCalculator onSubmit={vi.fn()} />);

    const valorImovelInput = screen.getByLabelText('Valor do Imóvel');
    const entradaInput = screen.getByLabelText('Entrada');
    const taxaInput = screen.getByLabelText('Taxa de Juros Mensal');
    const prazoInput = screen.getByLabelText('Prazo (meses)');

    expect(valorImovelInput).toHaveAttribute('inputmode', 'numeric');
    expect(entradaInput).toHaveAttribute('inputmode', 'numeric');
    expect(taxaInput).toHaveAttribute('inputmode', 'numeric');
    expect(prazoInput).toHaveAttribute('inputmode', 'numeric');

    expect(screen.getByRole('button', { name: /calcular/i })).toBeDisabled();
    expect(screen.queryByRole('button', { name: /limpar/i })).not.toBeInTheDocument();
  });

  it('deve preencher com atalhos e submeter dados válidos', () => {
    const onSubmit = vi.fn();
    render(<FormCalculator onSubmit={onSubmit} />);

    const valorImovelInput = screen.getByLabelText('Valor do Imóvel');
    const taxaInput = screen.getByLabelText('Taxa de Juros Mensal');

    fireEvent.change(valorImovelInput, { target: { value: '50000000' } });
    fireEvent.click(screen.getByRole('button', { name: '20% (Mín.)' }));
    fireEvent.change(taxaInput, { target: { value: '90' } });
    fireEvent.click(screen.getByRole('button', { name: '360m (30a)' }));

    const botaoCalcular = screen.getByRole('button', { name: /calcular/i });
    expect(botaoCalcular).toBeEnabled();

    fireEvent.click(botaoCalcular);
    expect(onSubmit).toHaveBeenCalledWith({
      valorImovel: 500000,
      entrada: 100000,
      taxaJuros: 0.9,
      prazoMeses: 360,
    });
  });
});
