import type { ComparacaoFinanciamento as ComparacaoType } from '../../types/financiamento';
import { ResultadoHeader } from './ResultadoHeader';
import { CartaoRecomendacao } from './CartaoRecomendacao';
import { GradeGraficos } from './GradeGraficos';
import { AbasTabelas } from './AbasTabelas';

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
