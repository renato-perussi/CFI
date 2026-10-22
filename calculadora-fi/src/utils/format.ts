export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatarMoedaCompacta(valor: number): string {
  const abs = Math.abs(valor);
  if (abs >= 1_000_000) {
    return `R$ ${(valor / 1_000_000).toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    })} mi`;
  }
  if (abs >= 10_000) {
    return `R$ ${(valor / 1_000).toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} mil`;
  }
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatarNumero(valor: number): string {
  return valor.toLocaleString('pt-BR');
}

export function formatarEntradaMoeda(valor: string): string {
  const apenasDigitos = valor.replace(/\D/g, '').slice(0, 11);

  if (!apenasDigitos) return '';

  const valorNumerico = parseInt(apenasDigitos, 10);
  if (!valorNumerico) return '';

  const valorEmReais = valorNumerico / 100;

  return valorEmReais.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatarEntradaPercentual(valor: string): string {
  const apenasDigitos = valor.replace(/\D/g, '').slice(0, 5);

  if (!apenasDigitos) return '';

  const valorNumerico = parseInt(apenasDigitos, 10);
  if (valorNumerico === 0 && valor !== '0' && valor !== '0,00') {
    return '';
  }

  const valorFormatado = (valorNumerico / 100).toFixed(2).replace('.', ',');

  return valorFormatado;
}

export function formatarEntradaPrazo(valor: string): string {
  const apenasDigitos = valor.replace(/\D/g, '').replace(/^0+/, '');
  return apenasDigitos;
}

/**
 * Inversas exatas das máscaras `/100`: todo o parsing de moeda/percentual
 * do app passa por aqui. `''` (campo vazio) → `NaN`; `'0,00'` → `0`.
 */
export function parseMoedaParaNumero(valor: string): number {
  if (!valor) return NaN;
  return parseFloat(valor.replace(/\./g, '').replace(',', '.'));
}

export function parsePercentualParaNumero(valor: string): number {
  if (!valor) return NaN;
  return parseFloat(valor.replace(',', '.'));
}

/**
 * Percentual pt-BR: `casas` = máximo de decimais, `minimo` (padrão = `casas`)
 * = mínimo (economia usa mín 1, `"10,0"`; entrada usa mín 0, `"20%"`).
 */
export function formatarPercentual(valor: number, casas = 1, minimo: number = casas): string {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: minimo,
    maximumFractionDigits: casas,
  });
}
