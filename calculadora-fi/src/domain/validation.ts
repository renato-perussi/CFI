import { ENTRADA_MINIMA, PRAZO_MAXIMO, TAXA_MAXIMA } from '../constants/business';

/**
 * Regras de negócio puras (mensagens pt-BR, mesma ordem de guardas).
 *
 * Recebe números já parseados; não importa `format.ts` — o mínimo formatado
 * (`'60.000,00'`) chega pronto via `minimoFormatado`.
 * `NaN` = campo vazio (`valorImovel` → mensagem de valor inválido, nunca
 * `'Campo obrigatório'`; demais → `'Campo obrigatório'`). A regra de 20%
 * só vale com `valorImovel > 0`.
 */
export interface DadosFinanciamento {
  valorImovel: number;
  entrada: number;
  taxaJuros: number;
  prazoMeses: number;
}

export interface ErrosFinanciamento {
  valorImovel?: string;
  entrada?: string;
  taxaJuros?: string;
  prazoMeses?: string;
}

export function validateFinanciamento(
  dados: DadosFinanciamento,
  minimoFormatado?: string
): ErrosFinanciamento {
  const { valorImovel, entrada, taxaJuros, prazoMeses } = dados;
  const erros: ErrosFinanciamento = {};

  if (isNaN(valorImovel) || valorImovel <= 0) {
    erros.valorImovel = 'Valor do imóvel deve ser maior que zero';
  }

  if (isNaN(entrada)) {
    erros.entrada = 'Campo obrigatório';
  } else if (entrada < 0) {
    erros.entrada = 'Entrada deve ser maior ou igual a zero';
  } else if (!isNaN(valorImovel) && valorImovel > 0) {
    const entradaMinima = valorImovel * ENTRADA_MINIMA;
    if (entrada < entradaMinima) {
      const rotulo =
        minimoFormatado ??
        entradaMinima.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      erros.entrada = `Entrada mínima de R$ ${rotulo} (${Math.round(ENTRADA_MINIMA * 100)}%)`;
    } else if (entrada >= valorImovel) {
      erros.entrada = 'Entrada deve ser menor que o valor do imóvel';
    }
  }

  if (isNaN(taxaJuros)) {
    erros.taxaJuros = 'Campo obrigatório';
  } else if (taxaJuros < 0) {
    erros.taxaJuros = 'Taxa de juros deve ser maior ou igual a zero';
  } else if (taxaJuros > TAXA_MAXIMA) {
    erros.taxaJuros = `Taxa de juros máxima de ${TAXA_MAXIMA}% ao mês`;
  }

  if (isNaN(prazoMeses)) {
    erros.prazoMeses = 'Campo obrigatório';
  } else if (prazoMeses <= 0) {
    erros.prazoMeses = 'Prazo deve ser maior que zero';
  } else if (prazoMeses > PRAZO_MAXIMO) {
    erros.prazoMeses = `Prazo máximo de ${PRAZO_MAXIMO} meses`;
  }

  return erros;
}
