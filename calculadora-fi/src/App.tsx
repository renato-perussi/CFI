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
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      <span className="sr-only">Carregando...</span>
    </div>
  );
}

function App() {
  const { resultado, calcular } = useFinanciamento();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Main>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Simule seu Financiamento</h2>
            <p className="text-gray-600 mb-8">
              Preencha os dados abaixo para comparar os sistemas SAC e Price.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <FormCalculator onSubmit={calcular} />
            </div>
          </FadeIn>

          {resultado && (
            <Suspense fallback={<LoadingFallback />}>
              <FadeIn delay={200}>
                <ComparacaoFinanciamento dados={resultado} />
              </FadeIn>
            </Suspense>
          )}

          <Suspense fallback={<LoadingFallback />}>
            <FadeIn delay={300}>
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
