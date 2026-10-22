# Calculadora de Financiamento Imobiliario

Ferramenta gratuita e acessivel para simular e comparar financiamentos imobiliarios pelos sistemas SAC e Price.

## Funcionalidades

- Formulario com validacao completa
- Calculo automatico SAC e Price
- 4 graficos comparativos (Parcelas, Juros, Amortizacao, Saldo Devedor)
- Tabela de amortizacao com paginacao (20 itens/pagina)
- Exportacao CSV (formato brasileiro)
- Compartilhamento via WhatsApp
- Conteudo educativo sobre SAC vs Price
- Design responsivo (mobile-first)

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Chart.js + react-chartjs-2
- Vitest (testes)

## Inicio Rapido

```bash
npm install
npm run dev
```

## Comandos

| Comando | Descricao |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de producao |
| `npm run preview` | Preview da build |
| `npm run test` | Executa testes |
| `npm run test:watch` | Testes em watch mode |
| `npm run lint` | Verifica lint (oxlint) |
| `npm run lint:fix` | Corrige lint |
| `npm run format` | Formata codigo (Prettier) |

## Estrutura

```
src/
  components/
    education/    # Conteudo educativo SAC vs Price
    form/         # Formulario de entrada
    layout/       # Header, Main, Footer
    results/      # Tabelas, graficos, comparacao, exportacao, WhatsApp
    ui/           # Componentes genericos (InputField, FadeIn, Pagination)
  hooks/          # useFinancing, useFormCalculator
  types/          # Interfaces TypeScript
  utils/          # Calculations, formatacao, CSV
```
