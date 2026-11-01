import { CONTEUDO } from './content';

interface PainelSistemaProps {
  variante: 'sac' | 'price';
}

const ESTILOS = {
  sac: {
    sigla: 'SAC',
    badge: 'bg-[#c1ff72] text-stone-900 border border-[#aae65f] font-bold text-sm',
    selo: 'bg-[#c1ff72] text-stone-900',
    formula: 'text-[#c1ff72] font-mono text-xs uppercase tracking-wider',
  },
  price: {
    sigla: 'PRICE',
    badge: 'bg-[#002f43] text-white font-bold text-xs',
    selo: 'bg-sky-100 text-[#002f43]',
    formula: 'text-[#c1ff72] font-mono text-xs uppercase tracking-wider',
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
          <h3 className="text-lg font-bold text-stone-900 font-montserrat">{sistema.titulo}</h3>
          <p className="text-xs sm:text-sm text-stone-500 font-montserrat">{sistema.subtitulo}</p>
        </div>
      </div>

      <p className="text-stone-700 text-sm sm:text-base mb-5 leading-relaxed">
        {sistema.descricao}
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {sistema.pontos.map((ponto) => (
          <li
            key={ponto}
            className="flex items-start gap-2.5 text-sm text-stone-700 bg-neutral-50 border border-stone-200 rounded-xl p-3.5"
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

      <div className="bg-stone-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-stone-800">
        <span className={`text-xs font-semibold uppercase tracking-wider ${estilos.formula}`}>
          Fórmula de Cálculo
        </span>
        <code className="text-xs sm:text-sm font-mono text-white bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700">
          {sistema.formula}
        </code>
      </div>
    </div>
  );
}
