import { FormField } from '../ui';
import { useFormCalculator } from '../../hooks/useFormCalculator';
import { parseMoedaParaNumero, parsePercentualParaNumero } from '../../utils/format';
import {
  calcularPercentualEntrada,
  calcularTaxaAnualEquivalente,
  formatarPrazoEmAnos,
  calcularValorFinanciadoPreview,
} from '../../utils/analise';
import { AtalhosEntrada } from './AtalhosEntrada';
import { AtalhosPrazo } from './AtalhosPrazo';
import { PreviewPrincipal } from './PreviewPrincipal';
import type { Financiamento } from '../../types/financiamento';

interface FormCalculatorProps {
  onSubmit: (financiamento: Financiamento) => void;
}

export function FormCalculator({ onSubmit }: FormCalculatorProps) {
  const { values, errors, isValid, handleChange, handleBlur, handleSubmit } = useFormCalculator();

  const handleFormSubmit = handleSubmit(onSubmit);

  const valorImovelNum = parseMoedaParaNumero(values.valorImovel) || 0;
  const entradaNum = parseMoedaParaNumero(values.entrada) || 0;
  const taxaMensalNum = parsePercentualParaNumero(values.taxaJuros) || 0;
  const prazoNum = parseInt(values.prazoMeses, 10) || 0;

  const percentualEntrada = calcularPercentualEntrada(valorImovelNum, entradaNum);

  const taxaAnualEquivalente = calcularTaxaAnualEquivalente(taxaMensalNum);

  const prazoEmAnos = formatarPrazoEmAnos(prazoNum);

  const valorFinanciadoPreview = calcularValorFinanciadoPreview(valorImovelNum, entradaNum);

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <FormField
          label="Valor do Imóvel"
          value={values.valorImovel}
          onChange={(value) => handleChange('valorImovel', value)}
          onBlur={() => handleBlur('valorImovel')}
          error={errors.valorImovel}
          prefix="R$"
          placeholder="0,00"
          maxLength={16}
          id="valor-imovel"
          hint="Valor total de avaliação ou compra do imóvel"
        />

        <FormField
          label="Entrada"
          value={values.entrada}
          onChange={(value) => handleChange('entrada', value)}
          onBlur={() => handleBlur('entrada')}
          error={errors.entrada}
          prefix="R$"
          placeholder="0,00"
          maxLength={16}
          id="entrada"
          badge={percentualEntrada}
          hint={
            <AtalhosEntrada
              valorImovelNum={valorImovelNum}
              entradaNum={entradaNum}
              onSelecionar={(centavos) => handleChange('entrada', centavos)}
            />
          }
        />

        <FormField
          label="Taxa de Juros Mensal"
          value={values.taxaJuros}
          onChange={(value) => handleChange('taxaJuros', value)}
          onBlur={() => handleBlur('taxaJuros')}
          error={errors.taxaJuros}
          suffix="%"
          placeholder="0,00"
          maxLength={6}
          id="taxa-juros"
          badge={taxaAnualEquivalente}
          hint="Informe a taxa mensal (ex: 0,85% ao mês)"
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
          badge={prazoEmAnos}
          hint={
            <AtalhosPrazo
              prazoMeses={values.prazoMeses}
              onSelecionar={(meses) => handleChange('prazoMeses', meses)}
            />
          }
        />
      </div>

      {valorFinanciadoPreview !== null && (
        <PreviewPrincipal valor={valorFinanciadoPreview} valorImovelNum={valorImovelNum} />
      )}

      <div className="pt-2 border-t border-slate-100">
        <button
          type="submit"
          disabled={!isValid}
          className={`
            w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base
            transition-all duration-200
            ${
              isValid
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          Calcular
        </button>
      </div>
    </form>
  );
}
