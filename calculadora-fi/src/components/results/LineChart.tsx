import { memo, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import type { Resultado } from '../../types/financing';
import { formatarMoedaCompacta, formatarNumero } from '../../utils/format';
import { handleSpotlightMouseMove } from '../../utils/spotlight';
import {
  registerChart,
  criarTooltipPadrao,
  COR_SAC,
  COR_SAC_BG,
  COR_PRICE,
  COR_PRICE_BG,
} from '../../utils/chart';

registerChart();

interface GraficoLinhaProps {
  titulo: string;
  rotuloEixoY: string;
  rotuloSAC: string;
  rotuloPrice: string;
  campoDados: 'parcela' | 'juros' | 'amortizacao' | 'saldoDevedor';
  resultadoSAC: Resultado;
  resultadoPrice: Resultado;
}

export const GraficoLinha = memo(function GraficoLinha({
  titulo,
  rotuloEixoY,
  rotuloSAC,
  rotuloPrice,
  campoDados,
  resultadoSAC,
  resultadoPrice,
}: GraficoLinhaProps) {
  const data = useMemo(() => {
    const labels = resultadoSAC.tabela.map((p) => formatarNumero(p.mes));

    return {
      labels,
      datasets: [
        {
          label: rotuloSAC,
          data: resultadoSAC.tabela.map((p) => p[campoDados]),
          borderColor: COR_SAC,
          backgroundColor: COR_SAC_BG,
          borderWidth: 2.25,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: COR_SAC,
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
          tension: 0.25,
          fill: true,
        },
        {
          label: rotuloPrice,
          data: resultadoPrice.tabela.map((p) => p[campoDados]),
          borderColor: COR_PRICE,
          backgroundColor: COR_PRICE_BG,
          borderWidth: 2.25,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: COR_PRICE,
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
          tension: 0.25,
          fill: true,
        },
      ],
    };
  }, [resultadoSAC, resultadoPrice, campoDados, rotuloSAC, rotuloPrice]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: criarTooltipPadrao(),
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Mês do Financiamento',
            font: { family: 'Geist, sans-serif', size: 11, weight: 500 },
            color: '#78716c',
            padding: { top: 6 },
          },
          ticks: {
            maxTicksLimit: 8,
            maxRotation: 0,
            font: { family: 'Geist, sans-serif', size: 11 },
            color: '#78716c',
          },
          grid: {
            display: false,
          },
          border: {
            color: '#e7e5e4',
          },
        },
        y: {
          title: {
            display: false,
            text: rotuloEixoY,
          },
          ticks: {
            maxTicksLimit: 6,
            font: { family: 'Geist, sans-serif', size: 11 },
            color: '#78716c',
            callback: (valor: number | string) => formatarMoedaCompacta(Number(valor)),
          },
          grid: {
            color: '#f5f5f4',
          },
          border: {
            display: false,
          },
        },
      },
    }),
    [rotuloEixoY]
  );

  return (
    <div
      onMouseMove={handleSpotlightMouseMove}
      className="spotlight-card h-full bg-white rounded-2xl shadow-xs border border-stone-200 p-5 sm:p-6 flex flex-col justify-between"
    >
      <div className="flex flex-col gap-2 mb-4 pb-3 border-b border-stone-200/70">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm sm:text-base font-semibold text-stone-900 truncate font-montserrat">
            {titulo}
          </h4>
          <span className="text-xs text-stone-400 shrink-0 hidden sm:inline">{rotuloEixoY}</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-stone-600">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#c1ff72] border border-lime-600"
              aria-hidden="true"
            />
            {rotuloSAC}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#002f43]" aria-hidden="true" />
            {rotuloPrice}
          </span>
        </div>
      </div>

      <div className="h-[240px] sm:h-[280px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
});
