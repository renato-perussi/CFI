import { FormCalculator } from '../form';
import type { Financiamento } from '../../types/financing';

interface SimulacaoCardProps {
  onSubmit: (financiamento: Financiamento) => void;
}

/** Cartão de simulação: cabeçalho editorial Hero NectArr + formulário. */
export function SimulacaoCard({ onSubmit }: SimulacaoCardProps) {
  return (
    <section
      aria-labelledby="simulacao-titulo"
      className="bg-white rounded-[32px] border border-stone-200 shadow-[0_-20px_40px_rgba(0,0,0,0.02)] overflow-hidden"
    >
      <div className="px-6 md:px-8 lg:px-10 pt-8 md:pt-10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium bg-white border-stone-200 text-stone-600">
          <span className="w-2 h-2 rounded-full bg-[#c1ff72] animate-pulse" aria-hidden="true" />
          <span>Simulador · SAC × Price</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-5">
          <div className="max-w-2xl">
            <h2
              id="simulacao-titulo"
              className="text-3xl md:text-4xl font-medium text-stone-900 tracking-tighter"
            >
              Simule seu{' '}
              <span className="font-google-sans-flex relative inline-block">
                financiamento
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-[#c1ff72]"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    opacity="0.4"
                  />
                </svg>
              </span>
            </h2>
            <p className="font-montserrat text-stone-500 text-sm sm:text-base leading-relaxed mt-3">
              Preencha os parâmetros abaixo para comparar os sistemas SAC e Price lado a lado.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#c1ff72] border border-[#aae65f] text-stone-900">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-900" aria-hidden="true" />
              SAC
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#002f43] border border-[#002f43] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden="true" />
              Price
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-8 lg:px-10 pb-8 md:pb-10">
        <FormCalculator onSubmit={onSubmit} />
      </div>
    </section>
  );
}
