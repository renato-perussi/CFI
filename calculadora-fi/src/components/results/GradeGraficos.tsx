import type { ComparacaoFinanciamento as ComparacaoType } from '../../types/financiamento';
import { GraficoLinha } from './GraficoLinha';

interface GradeGraficosProps {
  dados: ComparacaoType;
}

/** Grade 2x2 dos gráficos comparativos SAC vs Price. */
export function GradeGraficos({ dados }: GradeGraficosProps) {
  return (
    <section aria-label="Análise gráfica comparativa" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Análise Gráfica Comparativa
          </h3>
          <p className="text-sm text-slate-600">
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
