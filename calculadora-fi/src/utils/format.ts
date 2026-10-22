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
