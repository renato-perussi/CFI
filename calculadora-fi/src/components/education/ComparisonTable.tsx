import { CONTEUDO } from './content';

/** Tabela critério × SAC × Price. */
export function TabelaComparativa() {
  const { comparacao } = CONTEUDO;

  return (
    <div id="painel-comparacao" role="tabpanel" aria-labelledby="tab-comparacao">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-slate-900">{comparacao.titulo}</h3>
        <p className="text-xs sm:text-sm text-slate-500">{comparacao.subtitulo}</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200/80">
        <table className="w-full text-xs sm:text-sm" role="table">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80">
              <th className="text-left py-3 px-3 sm:px-4 font-semibold text-slate-700">Critério</th>
              <th className="text-left py-3 px-3 sm:px-4 font-bold text-emerald-700">SAC</th>
              <th className="text-left py-3 px-3 sm:px-4 font-bold text-blue-700">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {comparacao.criterios.map((item) => (
              <tr
                key={item.criterio}
                className="even:bg-slate-50/40 hover:bg-slate-50 transition-colors"
              >
                <td className="py-3 px-3 sm:px-4 font-semibold text-slate-800">{item.criterio}</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-800 font-medium">{item.sac}</td>
                <td className="py-3 px-3 sm:px-4 text-blue-800 font-medium">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
