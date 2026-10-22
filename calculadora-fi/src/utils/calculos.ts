import type { Parcela, Resultado, ComparacaoFinanciamento } from '../types/financiamento';

export function calcularSAC(valorFinanciado: number, taxaJuros: number, prazo: number): Resultado {
  const taxaDecimal = taxaJuros / 100;
  const amortizacaoFixa = valorFinanciado / prazo;
  const amortizacaoPadrao = Number(amortizacaoFixa.toFixed(2));
  const tabela: Parcela[] = [];
  let saldoDevedor = Number(valorFinanciado.toFixed(2));

  for (let mes = 1; mes <= prazo; mes++) {
    const jurosArredondados = Number((saldoDevedor * taxaDecimal).toFixed(2));
    const amortizacaoArredondada =
      mes === prazo ? Number(saldoDevedor.toFixed(2)) : amortizacaoPadrao;
    const parcelaArredondada = Number((amortizacaoArredondada + jurosArredondados).toFixed(2));
    saldoDevedor =
      mes === prazo ? 0 : Number(Math.max(saldoDevedor - amortizacaoArredondada, 0).toFixed(2));

    tabela.push({
      mes,
      amortizacao: amortizacaoArredondada,
      juros: jurosArredondados,
      parcela: parcelaArredondada,
      saldoDevedor,
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
  let saldoDevedor = Number(valorFinanciado.toFixed(2));

  if (taxaDecimal === 0) {
    const parcelaFixa = valorFinanciado / prazo;
    const parcelaPadrao = Number(parcelaFixa.toFixed(2));
    for (let mes = 1; mes <= prazo; mes++) {
      const amortizacaoArredondada =
        mes === prazo ? Number(saldoDevedor.toFixed(2)) : parcelaPadrao;
      saldoDevedor =
        mes === prazo ? 0 : Number(Math.max(saldoDevedor - amortizacaoArredondada, 0).toFixed(2));
      tabela.push({
        mes,
        amortizacao: amortizacaoArredondada,
        juros: 0,
        parcela: amortizacaoArredondada,
        saldoDevedor,
      });
    }
    return calcularTotais(tabela);
  }

  const fator = Math.pow(1 + taxaDecimal, prazo);
  const fatorFinito = Number.isFinite(fator);
  const parcelaFixa = !fatorFinito
    ? valorFinanciado * taxaDecimal
    : valorFinanciado * ((taxaDecimal * fator) / (fator - 1));
  const parcelaPadrao = Number(parcelaFixa.toFixed(2));

  for (let mes = 1; mes <= prazo; mes++) {
    const jurosArredondados = Number((saldoDevedor * taxaDecimal).toFixed(2));
    const isUltimaComFatorFinito = mes === prazo && fatorFinito;
    const amortizacaoArredondada = isUltimaComFatorFinito
      ? Number(saldoDevedor.toFixed(2))
      : Number((parcelaPadrao - jurosArredondados).toFixed(2));
    const parcelaArredondada = isUltimaComFatorFinito
      ? Number((amortizacaoArredondada + jurosArredondados).toFixed(2))
      : parcelaPadrao;
    saldoDevedor =
      mes === prazo ? 0 : Number(Math.max(saldoDevedor - amortizacaoArredondada, 0).toFixed(2));

    tabela.push({
      mes,
      amortizacao: amortizacaoArredondada,
      juros: jurosArredondados,
      parcela: parcelaArredondada,
      saldoDevedor,
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
