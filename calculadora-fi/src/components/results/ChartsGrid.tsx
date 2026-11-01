import type { ComparacaoFinanciamento as ComparacaoType } from '../../types/financing';
import { GraficoLinha } from './LineChart';

interface GradeGraficosProps {
  dados: ComparacaoType;
}

/** Grade 2x2 dos gráficos comparativos SAC vs Price. */
export function GradeGraficos({ dados }: GradeGraficosProps) {
  return (
    <section aria-label="Análise gráfica comparativa" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
        <div>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-stone-100 text-stone-900 font-montserrat mb-3">
            Análise visual
          </span>
          <h3 className="text-lg sm:text-xl font-medium text-stone-900 tracking-tight font-montserrat">
            Análise Gráfica Comparativa
          </h3>
          <p className="text-sm text-stone-500 font-montserrat">
            Comportamento das prestações, juros, amortização e evolução da dívida mês a mês.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GraficoLinha
          titulo="Evolução das Parcelas"
          rotuloEixoY="Valor da Parcela (R$)"
          rotuloSAC="Parcela SAC"
          rotuloPrice="Parcela Price"
          campoDados="parcela"
          resultadoSAC={dados.resultadoSAC}
          resultadoPrice={dados.resultadoPrice}
        />

        <GraficoLinha
          titulo="Evolução dos Juros"
          rotuloEixoY="Valor dos Juros (R$)"
          rotuloSAC="Juros SAC"
          rotuloPrice="Juros Price"
          campoDados="juros"
          resultadoSAC={dados.resultadoSAC}
          resultadoPrice={dados.resultadoPrice}
        />

        <GraficoLinha
          titulo="Evolução da Amortização"
          rotuloEixoY="Valor da Amortização (R$)"
          rotuloSAC="Amortização SAC"
          rotuloPrice="Amortização Price"
          campoDados="amortizacao"
          resultadoSAC={dados.resultadoSAC}
          resultadoPrice={dados.resultadoPrice}
        />

        <GraficoLinha
          titulo="Evolução do Saldo Devedor"
          rotuloEixoY="Saldo Devedor (R$)"
          rotuloSAC="Saldo Devedor SAC"
          rotuloPrice="Saldo Devedor Price"
          campoDados="saldoDevedor"
          resultadoSAC={dados.resultadoSAC}
          resultadoPrice={dados.resultadoPrice}
        />
      </div>
    </section>
  );
}
