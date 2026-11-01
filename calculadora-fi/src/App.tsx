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
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-stone-200 border-t-stone-900" />
      <span className="sr-only">Carregando...</span>
    </div>
  );
}

function App() {
  const { resultado, calcular } = useFinanciamento();

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-[#c1ff72] selection:text-neutral-900 text-neutral-900 font-geist bg-neutral-100 relative">
      <div
        className="fixed grid-lines w-full h-[100vh] top-0 right-0 left-0 pointer-events-none z-0"
        aria-hidden="true"
      />
      <Header />
      <Main>
        <div className="space-y-8">
          <FadeIn>
            <div id="simulador" className="scroll-mt-24">
              <SimulacaoCard onSubmit={calcular} />
            </div>
          </FadeIn>

          {resultado && (
            <Suspense fallback={<LoadingFallback />}>
              <div id="resultados" className="animate-fadeIn scroll-mt-24">
                <ComparacaoFinanciamento dados={resultado} />
              </div>
            </Suspense>
          )}

          <Suspense fallback={<LoadingFallback />}>
            <FadeIn delay={150}>
              <div id="educativo" className="scroll-mt-24">
                <ConteudoEducativo />
              </div>
            </FadeIn>
          </Suspense>
        </div>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
