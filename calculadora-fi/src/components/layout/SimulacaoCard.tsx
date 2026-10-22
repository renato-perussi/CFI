import { FormCalculator } from '../form';
import type { Financiamento } from '../../types/financiamento';

interface SimulacaoCardProps {
  onSubmit: (financiamento: Financiamento) => void;
}

/** Cartão de simulação: cabeçalho em gradiente + formulário. */
export function SimulacaoCard({ onSubmit }: SimulacaoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-5 md:px-8 md:py-6 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Simule seu Financiamento</h2>
            <p className="text-slate-300 text-sm mt-1">
              Preencha os parâmetros abaixo para comparar os sistemas SAC e Price lado a lado.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              SAC
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/15 text-blue-300 border border-blue-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" aria-hidden="true" />
              Price
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <FormCalculator onSubmit={onSubmit} />
      </div>
    </div>
  );
}
