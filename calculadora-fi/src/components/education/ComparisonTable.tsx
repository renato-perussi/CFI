import { CONTEUDO } from './content';

/** Tabela critério × SAC × Price. */
export function TabelaComparativa() {
  const { comparacao } = CONTEUDO;

  return (
    <div id="painel-comparacao" role="tabpanel" aria-labelledby="tab-comparacao">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-stone-900 font-montserrat">{comparacao.titulo}</h3>
        <p className="text-xs sm:text-sm text-stone-500 font-montserrat">{comparacao.subtitulo}</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-neutral-50">
        <table className="w-full text-xs sm:text-sm" role="table">
          <thead>
            <tr className="bg-neutral-50 border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500 font-montserrat">
              <th className="text-left py-3 px-3 sm:px-4 font-semibold">Critério</th>
              <th className="text-left py-3 px-3 sm:px-4 font-bold text-stone-900">SAC</th>
              <th className="text-left py-3 px-3 sm:px-4 font-bold text-[#002f43]">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/70 bg-white">
            {comparacao.criterios.map((item) => (
              <tr
                key={item.criterio}
                className="even:bg-neutral-50/40 hover:bg-[#c1ff72]/15 transition-colors"
              >
                <td className="py-3 px-3 sm:px-4 font-semibold text-stone-800">{item.criterio}</td>
                <td className="py-3 px-3 sm:px-4 text-stone-700 font-medium">{item.sac}</td>
                <td className="py-3 px-3 sm:px-4 text-[#002f43] font-medium">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
