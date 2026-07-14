import { FormField } from '../ui/FormField';
import { useFormCalculator } from '../../hooks/useFormCalculator';
import type { Financiamento } from '../../types/financiamento';

interface FormCalculatorProps {
  onSubmit: (financiamento: Financiamento) => void;
}

export function FormCalculator({ onSubmit }: FormCalculatorProps) {
  const { values, errors, isValid, handleChange, handleBlur, handleSubmit, reset } =
    useFormCalculator();

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Valor do Imóvel"
          value={values.valorImovel}
          onChange={(value) => handleChange('valorImovel', value)}
          onBlur={() => handleBlur('valorImovel')}
          error={errors.valorImovel}
          prefix="R$"
          placeholder="0,00"
          id="valor-imovel"
        />

        <FormField
          label="Entrada"
          value={values.entrada}
          onChange={(value) => handleChange('entrada', value)}
          onBlur={() => handleBlur('entrada')}
          error={errors.entrada}
          prefix="R$"
          placeholder="0,00"
          id="entrada"
        />

        <FormField
          label="Taxa de Juros Mensal"
          value={values.taxaJuros}
          onChange={(value) => handleChange('taxaJuros', value)}
          onBlur={() => handleBlur('taxaJuros')}
          error={errors.taxaJuros}
          suffix="%"
          placeholder="0,00"
          id="taxa-juros"
        />

        <FormField
          label="Prazo (meses)"
          value={values.prazoMeses}
          onChange={(value) => handleChange('prazoMeses', value)}
          onBlur={() => handleBlur('prazoMeses')}
          error={errors.prazoMeses}
          placeholder="Ex: 360"
          maxLength={3}
          id="prazo"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="submit"
          disabled={!isValid}
          className={`
            flex-1 px-6 py-3 rounded-lg font-semibold text-white
            transition-colors duration-200
            ${
              isValid
                ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                : 'bg-gray-400 cursor-not-allowed'
            }
          `}
        >
          Calcular
        </button>

        <button
          type="button"
          onClick={reset}
          className="flex-1 px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Limpar
        </button>
      </div>
    </form>
  );
}
