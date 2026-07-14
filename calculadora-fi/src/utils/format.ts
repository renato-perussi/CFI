export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatarNumero(valor: number): string {
  return valor.toLocaleString('pt-BR');
}

export function formatarEntradaMoeda(valor: string): string {
  const apenasDigitos = valor.replace(/\D/g, '');

  if (!apenasDigitos) return '';

  const valorNumerico = parseInt(apenasDigitos, 10);
  const valorEmReais = valorNumerico / 100;

  return valorEmReais.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatarEntradaPercentual(valor: string): string {
  const apenasDigitos = valor.replace(/\D/g, '');

  if (!apenasDigitos) return '';

  const valorNumerico = parseInt(apenasDigitos, 10);
  const valorFormatado = (valorNumerico / 100).toFixed(2);

  return valorFormatado;
}

export function formatarEntradaPrazo(valor: string): string {
  const apenasDigitos = valor.replace(/\D/g, '');
  return apenasDigitos;
}
