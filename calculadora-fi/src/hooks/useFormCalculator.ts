import { useState, useCallback, useMemo } from 'react';
import type { Financiamento } from '../types/financiamento';
import {
  formatarEntradaMoeda,
  formatarEntradaPercentual,
  formatarEntradaPrazo,
} from '../utils/format';

export interface FormErrors {
  valorImovel?: string;
  entrada?: string;
  taxaJuros?: string;
  prazoMeses?: string;
}

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

export function useFormCalculator() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = useCallback((vals: FormValues): FormErrors => {
    const newErrors: FormErrors = {};

    const valorImovel = parseFloat(vals.valorImovel.replace(/\./g, '').replace(',', '.'));
    const entrada = parseFloat(vals.entrada.replace(/\./g, '').replace(',', '.'));
    const taxaJuros = parseFloat(vals.taxaJuros.replace(',', '.'));
    const prazoMeses = parseInt(vals.prazoMeses, 10);

    if (!vals.valorImovel || isNaN(valorImovel) || valorImovel <= 0) {
      newErrors.valorImovel = 'Valor do imóvel deve ser maior que zero';
    }

    if (!vals.entrada && vals.entrada !== '0') {
      newErrors.entrada = 'Campo obrigatório';
    } else if (isNaN(entrada) || entrada < 0) {
      newErrors.entrada = 'Entrada deve ser maior ou igual a zero';
    } else if (valorImovel > 0) {
      const entradaMinima = valorImovel * 0.2;
      if (entrada < entradaMinima) {
        newErrors.entrada = `Entrada mínima de ${formatarEntradaMoeda(String(entradaMinima * 100))}`;
      } else if (entrada >= valorImovel) {
        newErrors.entrada = 'Entrada deve ser menor que o valor do imóvel';
      }
    }

    if (!vals.taxaJuros && vals.taxaJuros !== '0') {
      newErrors.taxaJuros = 'Campo obrigatório';
    } else if (isNaN(taxaJuros) || taxaJuros < 0) {
      newErrors.taxaJuros = 'Taxa de juros deve ser maior ou igual a zero';
    }

    if (!vals.prazoMeses) {
      newErrors.prazoMeses = 'Campo obrigatório';
    } else if (isNaN(prazoMeses) || prazoMeses <= 0) {
      newErrors.prazoMeses = 'Prazo deve ser maior que zero';
    } else if (prazoMeses > 600) {
      newErrors.prazoMeses = 'Prazo máximo de 600 meses';
    }

    return newErrors;
  }, []);

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

      setValues((prev) => ({ ...prev, [field]: formattedValue }));

      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (field: keyof FormValues) => {
      const fieldErrors = validate(values);
      if (fieldErrors[field]) {
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
      }
    },
    [values, validate]
  );

  const validateAll = useCallback(() => {
    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  }, [values, validate]);

  const getFinanciamento = useCallback((): Financiamento | null => {
    if (!validateAll()) return null;

    const valorImovel = parseFloat(values.valorImovel.replace(/\./g, '').replace(',', '.'));
    const entrada = parseFloat(values.entrada.replace(/\./g, '').replace(',', '.')) || 0;
    const taxaJuros = parseFloat(values.taxaJuros.replace(',', '.'));
    const prazoMeses = parseInt(values.prazoMeses, 10);

    return {
      valorImovel,
      entrada,
      taxaJuros,
      prazoMeses,
    };
  }, [values, validateAll]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, []);

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
    reset,
  };
}
