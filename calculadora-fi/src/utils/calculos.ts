import type { Parcela, Resultado, ComparacaoFinanciamento } from '../types/financiamento';

export function calcularSAC(valorFinanciado: number, taxaJuros: number, prazo: number): Resultado {
  const taxaDecimal = taxaJuros / 100;
  const amortizacaoFixa = valorFinanciado / prazo;
  const tabela: Parcela[] = [];
  let saldoDevedor = valorFinanciado;

  for (let mes = 1; mes <= prazo; mes++) {
    const juros = saldoDevedor * taxaDecimal;
    const parcela = amortizacaoFixa + juros;
    saldoDevedor -= amortizacaoFixa;

    tabela.push({
      mes,
      amortizacao: Number(amortizacaoFixa.toFixed(2)),
      juros: Number(juros.toFixed(2)),
      parcela: Number(parcela.toFixed(2)),
      saldoDevedor: Number(Math.max(saldoDevedor, 0).toFixed(2)),
    });
  }

  return calcularTotais(tabela);
}

export function calcularPrice(
  valorFinanciado: number,
  taxaJuros: number,
  prazo: number
): Resultado {
  const taxaDecimal = taxaJuros / 100;
  const tabela: Parcela[] = [];
  let saldoDevedor = valorFinanciado;

  if (taxaDecimal === 0) {
    const parcelaFixa = valorFinanciado / prazo;
    for (let mes = 1; mes <= prazo; mes++) {
      saldoDevedor -= parcelaFixa;
      tabela.push({
        mes,
        amortizacao: Number(parcelaFixa.toFixed(2)),
        juros: 0,
        parcela: Number(parcelaFixa.toFixed(2)),
        saldoDevedor: Number(Math.max(saldoDevedor, 0).toFixed(2)),
      });
    }
    return calcularTotais(tabela);
  }

  const fator = Math.pow(1 + taxaDecimal, prazo);
  const parcelaFixa = valorFinanciado * ((taxaDecimal * fator) / (fator - 1));

  for (let mes = 1; mes <= prazo; mes++) {
    const juros = saldoDevedor * taxaDecimal;
    const amortizacao = parcelaFixa - juros;
    saldoDevedor -= amortizacao;

    tabela.push({
      mes,
      amortizacao: Number(amortizacao.toFixed(2)),
      juros: Number(juros.toFixed(2)),
      parcela: Number(parcelaFixa.toFixed(2)),
      saldoDevedor: Number(Math.max(saldoDevedor, 0).toFixed(2)),
    });
  }

  return calcularTotais(tabela);
}

export function calcularTotais(tabela: Parcela[]): Resultado {
  const totalPago = tabela.reduce((acc, p) => acc + p.parcela, 0);
  const totalJuros = tabela.reduce((acc, p) => acc + p.juros, 0);

  return {
    totalPago: Number(totalPago.toFixed(2)),
    totalJuros: Number(totalJuros.toFixed(2)),
    parcelaInicial: tabela[0]?.parcela ?? 0,
    parcelaFinal: tabela[tabela.length - 1]?.parcela ?? 0,
    tabela,
  };
}

export function compararFinanciamentos(
  resultadoSAC: Resultado,
  resultadoPrice: Resultado
): ComparacaoFinanciamento {
  const melhorOpcao = resultadoSAC.totalPago <= resultadoPrice.totalPago ? 'SAC' : 'PRICE';
  const economia = Math.abs(resultadoSAC.totalPago - resultadoPrice.totalPago);

  return {
    melhorOpcao,
    economia: Number(economia.toFixed(2)),
    resultadoSAC,
    resultadoPrice,
  };
}
