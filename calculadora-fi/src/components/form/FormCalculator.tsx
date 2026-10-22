import { FormField } from '../ui/FormField';
import { useFormCalculator } from '../../hooks/useFormCalculator';
import {
  formatarMoeda,
  formatarPercentual,
  parseMoedaParaNumero,
  parsePercentualParaNumero,
} from '../../utils/format';
import {
  calcularPercentualEntrada,
  calcularTaxaAnualEquivalente,
  formatarPrazoEmAnos,
  calcularValorFinanciadoPreview,
} from '../../utils/analise';
import type { Financiamento } from '../../types/financiamento';

interface FormCalculatorProps {
  onSubmit: (financiamento: Financiamento) => void;
}

const ENTRADAS_SUGERIDAS = [
  { percentual: 20, rotulo: '20% (Mín.)' },
  { percentual: 30, rotulo: '30%' },
  { percentual: 40, rotulo: '40%' },
  { percentual: 50, rotulo: '50%' },
];

const PRAZOS_SUGERIDOS = [
  { meses: '120', rotulo: '120m (10a)' },
  { meses: '240', rotulo: '240m (20a)' },
  { meses: '360', rotulo: '360m (30a)' },
  { meses: '420', rotulo: '420m (35a)' },
];

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
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="text-slate-400 mr-0.5">Atalhos:</span>
              {ENTRADAS_SUGERIDAS.map((item) => {
                const valorAlvoCentavos =
                  valorImovelNum > 0 ? Math.round(valorImovelNum * item.percentual) : 0;
                const ativo =
                  valorImovelNum > 0 &&
                  Math.abs(Math.round(entradaNum * 100) - valorAlvoCentavos) <= 1;

                return (
                  <button
                    key={item.percentual}
                    type="button"
                    disabled={valorImovelNum <= 0}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      if (valorImovelNum > 0) {
                        handleChange('entrada', String(valorAlvoCentavos));
                      }
                    }}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
                      valorImovelNum <= 0
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : ativo
                          ? 'bg-blue-600 text-white cursor-pointer'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer'
                    }`}
                  >
                    {item.rotulo}
                  </button>
                );
              })}
            </div>
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
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="text-slate-400 mr-0.5">Atalhos:</span>
              {PRAZOS_SUGERIDOS.map((item) => {
                const ativo = values.prazoMeses === item.meses;
                return (
                  <button
                    key={item.meses}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleChange('prazoMeses', item.meses)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                      ativo
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {item.rotulo}
                  </button>
                );
              })}
            </div>
          }
        />
      </div>

      {valorFinanciadoPreview !== null && (
        <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm animate-fadeIn">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" aria-hidden="true" />
            <span>Valor a financiar (Principal):</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-900 tabular-nums">
              {formatarMoeda(valorFinanciadoPreview)}
            </span>
            <span className="text-xs font-medium text-slate-500 tabular-nums">
              ({formatarPercentual((valorFinanciadoPreview / valorImovelNum) * 100, 0)}% do imóvel)
            </span>
          </div>
        </div>
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
