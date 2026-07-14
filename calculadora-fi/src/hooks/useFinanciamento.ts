import { useState, useCallback } from 'react';
import type { Financiamento, ComparacaoFinanciamento } from '../types/financiamento';
import { calcularSAC, calcularPrice, compararFinanciamentos } from '../utils/calculos';

export function useFinanciamento() {
  const [resultado, setResultado] = useState<ComparacaoFinanciamento | null>(null);

  const calcular = useCallback((financiamento: Financiamento) => {
    const valorFinanciado = financiamento.valorImovel - financiamento.entrada;

    const resultadoSAC = calcularSAC(
      valorFinanciado,
      financiamento.taxaJuros,
      financiamento.prazoMeses
    );
    const resultadoPrice = calcularPrice(
      valorFinanciado,
      financiamento.taxaJuros,
      financiamento.prazoMeses
    );

    const comparacao = compararFinanciamentos(resultadoSAC, resultadoPrice);
    setResultado(comparacao);
  }, []);

  return {
    resultado,
    calcular,
  };
}
