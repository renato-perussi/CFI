import { useState, useCallback, useMemo } from 'react';
import type { Financiamento } from '../types/financiamento';
import {
  formatarEntradaMoeda,
  formatarEntradaPercentual,
  formatarEntradaPrazo,
  parseMoedaParaNumero,
  parsePercentualParaNumero,
} from '../utils/format';
import { ENTRADA_MINIMA } from '../constants/negocio';
import { validateFinanciamento, type ErrosFinanciamento } from '../domain/validacao';

/** Mesma forma de `ErrosFinanciamento` (domínio); mantido o nome usado pela UI. */
export type FormErrors = ErrosFinanciamento;

export interface FormValues {
  valorImovel: string;
  entrada: string;
  taxaJuros: string;
  prazoMeses: string;
}

const initialValues: FormValues = {
  valorImovel: '',
  entrada: '',
  taxaJuros: '',
  prazoMeses: '',
};

/** Compõe o `minimoFormatado` (`'60.000,00'`) do validador; `undefined` com imóvel inválido. */
function formatarMinimoEntrada(valorImovel: number): string | undefined {
  if (isNaN(valorImovel) || valorImovel <= 0) return undefined;
  return formatarEntradaMoeda(String(Math.round(valorImovel * ENTRADA_MINIMA * 100)));
}

export function useFormCalculator() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  /** Adaptador: parse (`format.ts`) → valida (`domain`) → formata mensagem. */
  const validate = useCallback((vals: FormValues): FormErrors => {
    const valorImovel = parseMoedaParaNumero(vals.valorImovel);
    return validateFinanciamento(
      {
        valorImovel,
        entrada: parseMoedaParaNumero(vals.entrada),
        taxaJuros: parsePercentualParaNumero(vals.taxaJuros),
        prazoMeses: parseInt(vals.prazoMeses, 10),
      },
      formatarMinimoEntrada(valorImovel)
    );
  }, []);

  /** Revalida só o erro de `entrada` quando `valorImovel` muda (regra de 20%). */
  const revalidarCruzada = useCallback(
    (vals: FormValues, field: keyof FormValues, base: FormErrors): FormErrors => {
      const nextErrors = { ...base };
      if (field === 'valorImovel' && vals.entrada) {
        const fieldErrors = validate(vals);
        if (fieldErrors.entrada) {
          nextErrors.entrada = fieldErrors.entrada;
        } else {
          delete nextErrors.entrada;
        }
      }
      return nextErrors;
    },
    [validate]
  );

  const isValid = useMemo(() => {
    const validationErrors = validate(values);
    return Object.keys(validationErrors).length === 0;
  }, [values, validate]);

  const handleChange = useCallback(
    (field: keyof FormValues, value: string) => {
      let formattedValue = value;

      switch (field) {
        case 'valorImovel':
        case 'entrada':
          formattedValue = formatarEntradaMoeda(value);
          break;
        case 'taxaJuros':
          formattedValue = formatarEntradaPercentual(value);
          break;
        case 'prazoMeses':
          formattedValue = formatarEntradaPrazo(value);
          break;
      }

      const nextValues = { ...values, [field]: formattedValue };
      setValues(nextValues);

      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[field];
        return revalidarCruzada(nextValues, field, nextErrors);
      });
    },
    [values, revalidarCruzada]
  );

  const handleBlur = useCallback(
    (field: keyof FormValues) => {
      const fieldErrors = validate(values);
      setErrors((prev) => {
        const nextErrors = { ...prev };
        if (fieldErrors[field]) {
          nextErrors[field] = fieldErrors[field];
        } else {
          delete nextErrors[field];
        }
        return revalidarCruzada(values, field, nextErrors);
      });
    },
    [values, validate, revalidarCruzada]
  );

  const validateAll = useCallback(() => {
    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  }, [values, validate]);

  const getFinanciamento = useCallback((): Financiamento | null => {
    if (!validateAll()) return null;

    const valorImovel = parseMoedaParaNumero(values.valorImovel);
    const entrada = parseMoedaParaNumero(values.entrada) || 0;
    const taxaJuros = parsePercentualParaNumero(values.taxaJuros);
    const prazoMeses = parseInt(values.prazoMeses, 10);

    return {
      valorImovel,
      entrada,
      taxaJuros,
      prazoMeses,
    };
  }, [values, validateAll]);

  const handleSubmit = useCallback(
    (onSubmit: (financiamento: Financiamento) => void) => {
      return (e: React.FormEvent) => {
        e.preventDefault();

        const financiamento = getFinanciamento();
        if (financiamento) {
          onSubmit(financiamento);
        }
      };
    },
    [getFinanciamento]
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
