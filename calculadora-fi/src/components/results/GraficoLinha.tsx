import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { Resultado } from '../../types/financiamento';
import { formatarMoeda, formatarNumero } from '../../utils/format';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface GraficoLinhaProps {
  titulo: string;
  rotuloEixoY: string;
  rotuloSAC: string;
  rotuloPrice: string;
  campoDados: 'parcela' | 'juros' | 'amortizacao' | 'saldoDevedor';
  resultadoSAC: Resultado;
  resultadoPrice: Resultado;
}

const COR_SAC = '#16a34a';
const COR_SAC_BG = 'rgba(22, 163, 74, 0.1)';
const COR_PRICE = '#2563eb';
const COR_PRICE_BG = 'rgba(37, 99, 235, 0.1)';

export function GraficoLinha({
  titulo,
  rotuloEixoY,
  rotuloSAC,
  rotuloPrice,
  campoDados,
  resultadoSAC,
  resultadoPrice,
}: GraficoLinhaProps) {
  const labels = resultadoSAC.tabela.map((p) => formatarNumero(p.mes));

  const data = {
    labels,
    datasets: [
      {
        label: rotuloSAC,
        data: resultadoSAC.tabela.map((p) => p[campoDados]),
        borderColor: COR_SAC,
        backgroundColor: COR_SAC_BG,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: COR_SAC,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        tension: 0.3,
        fill: true,
      },
      {
        label: rotuloPrice,
        data: resultadoPrice.tabela.map((p) => p[campoDados]),
        borderColor: COR_PRICE,
        backgroundColor: COR_PRICE_BG,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: COR_PRICE,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 13,
            weight: 600,
          },
        },
      },
      title: {
        display: true,
        text: titulo,
        font: {
          size: 16,
          weight: 700,
        },
        color: '#1f2937',
        padding: { bottom: 16 },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        titleFont: { size: 13, weight: 600 },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 4,
        callbacks: {
          title: (items: Array<{ label: string }>) => `Mês ${items[0].label}`,
          label: (context: { dataset: { label?: string }; parsed: { y: number | null } }) => {
            const valor = context.parsed.y;
            if (valor === null) return '';
            return ` ${context.dataset.label}: ${formatarMoeda(valor)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mês',
          font: { size: 12, weight: 600 },
          color: '#6b7280',
        },
        ticks: {
          maxTicksLimit: 12,
          font: { size: 11 },
          color: '#6b7280',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: rotuloEixoY,
          font: { size: 12, weight: 600 },
          color: '#6b7280',
        },
        ticks: {
          font: { size: 11 },
          color: '#6b7280',
          callback: (valor: number | string) => formatarMoeda(Number(valor)),
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.06)',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <div className="h-[320px] sm:h-[380px] md:h-[420px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
