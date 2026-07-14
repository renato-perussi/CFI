import type { Resultado } from '../../types/financiamento';
import { formatarMoeda } from '../../utils/format';

interface ResultadoHeaderProps {
  titulo: string;
  resultado: Resultado;
  variante?: 'sac' | 'price';
}

export function ResultadoHeader({ titulo, resultado, variante = 'sac' }: ResultadoHeaderProps) {
  const corBorda = variante === 'sac' ? 'border-green-500' : 'border-blue-500';
  const corFundo = variante === 'sac' ? 'bg-green-50' : 'bg-blue-50';
  const corTexto = variante === 'sac' ? 'text-green-700' : 'text-blue-700';

  return (
    <div className={`rounded-xl border-l-4 ${corBorda} ${corFundo} p-6`}>
      <h4 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${corTexto}`}>{titulo}</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Parcela Inicial</p>
          <p className="text-lg font-bold text-gray-800">
            {formatarMoeda(resultado.parcelaInicial)}
          </p>
        </div>
        {variante === 'sac' && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Parcela Final</p>
            <p className="text-lg font-bold text-gray-800">
              {formatarMoeda(resultado.parcelaFinal)}
            </p>
          </div>
        )}
        <div>
          <p className="text-xs text-gray-500 mb-1">Total Pago</p>
          <p className="text-lg font-bold text-gray-800">{formatarMoeda(resultado.totalPago)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Total Juros</p>
          <p className="text-lg font-bold text-gray-800">{formatarMoeda(resultado.totalJuros)}</p>
        </div>
      </div>
    </div>
  );
}
