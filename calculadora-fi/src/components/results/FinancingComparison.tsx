import type { ComparacaoFinanciamento as ComparacaoType } from '../../types/financing';
import { ResultadoHeader } from './ResultHeader';
import { CartaoRecomendacao } from './RecommendationCard';
import { GradeGraficos } from './ChartsGrid';
import { AbasTabelas } from './TableTabs';

interface ComparacaoFinanciamentoProps {
  dados: ComparacaoType;
}

/** Orquestra recomendação, resumo por sistema, gráficos e tabelas. */
export function ComparacaoFinanciamento({ dados }: ComparacaoFinanciamentoProps) {
  const isSAC = dados.melhorOpcao === 'SAC';

  return (
    <div className="space-y-8">
      <CartaoRecomendacao dados={dados} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ResultadoHeader
          titulo="SAC — Sistema de Amortização Constante"
          resultado={dados.resultadoSAC}
          variante="sac"
          destaque={isSAC}
        />
        <ResultadoHeader
          titulo="Price — Sistema de Tabela Price"
          resultado={dados.resultadoPrice}
          variante="price"
          destaque={!isSAC}
        />
      </div>

      <GradeGraficos dados={dados} />

      <AbasTabelas dados={dados} />
    </div>
  );
}
