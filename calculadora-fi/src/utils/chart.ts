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
import { formatarMoeda } from './format';

/** Registra os elementos do Chart.js usados pelos gráficos de linha. */
export function registerChart(): void {
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
}

/** Paleta SAC/Price dos gráficos. */
export const COR_SAC = '#059669';
export const COR_SAC_BG = 'rgba(5, 150, 105, 0.08)';
export const COR_PRICE = '#2563eb';
export const COR_PRICE_BG = 'rgba(37, 99, 235, 0.08)';

/** Tooltip padrão pt-BR dos gráficos de linha. */
export function criarTooltipPadrao() {
  return {
    backgroundColor: '#0f172a',
    titleFont: { family: 'Inter, sans-serif', size: 12, weight: 600 },
    bodyFont: { family: 'Inter, sans-serif', size: 12 },
    padding: 12,
    cornerRadius: 10,
    displayColors: true,
    boxWidth: 8,
    boxHeight: 8,
    boxPadding: 6,
    callbacks: {
      title: (items: Array<{ label: string }>) => `Mês ${items[0].label}`,
      label: (context: { dataset: { label?: string }; parsed: { y: number | null } }) => {
        const valor = context.parsed.y;
        if (valor === null) return '';
        return ` ${context.dataset.label}: ${formatarMoeda(valor)}`;
      },
    },
  };
}
