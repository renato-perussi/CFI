import { lazy, Suspense } from 'react';
import { Header, Main, Footer, SimulacaoCard } from './components/layout';
import { FadeIn } from './components/ui';
import { useFinanciamento } from './hooks/useFinancing';

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
            <SimulacaoCard onSubmit={calcular} />
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
