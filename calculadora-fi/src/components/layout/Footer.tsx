export function Footer() {
  return (
    <footer className="bg-gray-100 border-t py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
        <p>Calculadora de Financiamento Imobiliário &copy; {new Date().getFullYear()}</p>
        <p className="mt-1">
          Ferramenta educativa. Consulte um especialista para decisões financeiras.
        </p>
      </div>
    </footer>
  );
}
