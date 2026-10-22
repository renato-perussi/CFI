import { CONTEUDO } from './conteudo';

interface PainelSistemaProps {
  variante: 'sac' | 'price';
}

const ESTILOS = {
  sac: {
    sigla: 'SAC',
    badge: 'bg-emerald-100 text-emerald-700 font-bold text-sm',
    selo: 'bg-emerald-100 text-emerald-700',
    formula: 'text-emerald-400',
  },
  price: {
    sigla: 'PRICE',
    badge: 'bg-blue-100 text-blue-700 font-bold text-xs',
    selo: 'bg-blue-100 text-blue-700',
    formula: 'text-blue-400',
  },
} as const;

/** Painel explicativo de um sistema (título, pontos e fórmula). */
export function PainelSistema({ variante }: PainelSistemaProps) {
  const sistema = CONTEUDO[variante];
  const estilos = ESTILOS[variante];

  return (
    <div id={`painel-${variante}`} role="tabpanel" aria-labelledby={`tab-${variante}`}>
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${estilos.badge}`}
        >
          {estilos.sigla}
        </span>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{sistema.titulo}</h3>
          <p className="text-xs sm:text-sm text-slate-500">{sistema.subtitulo}</p>
        </div>
      </div>

      <p className="text-slate-700 text-sm sm:text-base mb-5 leading-relaxed">
        {sistema.descricao}
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {sistema.pontos.map((ponto) => (
          <li
            key={ponto}
            className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50/80 border border-slate-100 rounded-xl p-3.5"
          >
            <span
              className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold shrink-0 mt-0.5 ${estilos.selo}`}
              aria-hidden="true"
            >
              ✓
            </span>
            <span>{ponto}</span>
          </li>
        ))}
      </ul>

      <div className="bg-slate-900 text-slate-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className={`text-xs font-semibold uppercase tracking-wider ${estilos.formula}`}>
          Fórmula de Cálculo
        </span>
        <code className="text-xs sm:text-sm font-mono text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
          {sistema.formula}
        </code>
      </div>
    </div>
  );
}
