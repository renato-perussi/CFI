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
