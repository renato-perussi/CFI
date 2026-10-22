import { lazy, Suspense } from 'react';
import { Header, Main, Footer } from './components/layout';
import { FormCalculator } from './components/form';
import { FadeIn } from './components/ui';
import { useFinanciamento } from './hooks/useFinanciamento';

const ComparacaoFinanciamento = lazy(() =>
  import('./components/results').then((m) => ({ default: m.ComparacaoFinanciamento }))
);
const ConteudoEducativo = lazy(() =>
  import('./components/education').then((m) => ({ default: m.ConteudoEducativo }))
);

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-12" role="status" aria-label="Carregando">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-blue-600" />
      <span className="sr-only">Carregando...</span>
    </div>
  );
}

function App() {
  const { resultado, calcular } = useFinanciamento();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      <Header />
      <Main>
        <div className="space-y-8">
          <FadeIn>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-5 md:px-8 md:py-6 border-b border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                      Simule seu Financiamento
                    </h2>
                    <p className="text-slate-300 text-sm mt-1">
                      Preencha os parâmetros abaixo para comparar os sistemas SAC e Price lado a
                      lado.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                        aria-hidden="true"
                      />
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
                <FormCalculator onSubmit={calcular} />
              </div>
            </div>
          </FadeIn>

          {resultado && (
            <Suspense fallback={<LoadingFallback />}>
              <div className="animate-fadeIn">
                <ComparacaoFinanciamento dados={resultado} />
              </div>
            </Suspense>
          )}

          <Suspense fallback={<LoadingFallback />}>
            <FadeIn delay={150}>
              <ConteudoEducativo />
            </FadeIn>
          </Suspense>
        </div>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
