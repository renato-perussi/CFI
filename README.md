# CFI — Calculadora de Financiamento Imobiliário

![License MIT](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)

Ferramenta gratuita e acessível para simular e comparar financiamentos imobiliários pelos sistemas SAC e Price.

## Funcionalidades

- Formulário com validação completa
- Cálculo automático SAC e Price
- 4 gráficos comparativos (Parcelas, Juros, Amortização, Saldo Devedor)
- Tabela de amortização com paginação
- Exportação CSV (formato brasileiro)
- Compartilhamento via WhatsApp
- Conteúdo educativo sobre SAC vs Price
- Design responsivo (mobile-first)

## Stack

| Camada | Tecnologia |
|--------|------------|
| UI | React 19 + TypeScript |
| Bundler | Vite 8 |
| Estilos | Tailwind CSS 4 |
| Gráficos | Chart.js + react-chartjs-2 |
| Testes | Vitest + Testing Library |
| Lint | OxLint |
| Formatação | Prettier |

## Início Rápido

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview da build |
| `npm run test` | Executa testes |
| `npm run test:watch` | Testes em watch mode |
| `npm run lint` | Verifica lint |
| `npm run lint:fix` | Corrige lint |
| `npm run format` | Formata código |

## Estrutura do Projeto

```
├── calculadora-fi/          # Aplicação principal
│   ├── src/
│   │   ├── components/
│   │   │   ├── education/   # Conteúdo educativo SAC vs Price
│   │   │   ├── form/        # Formulário de entrada
│   │   │   ├── layout/      # Header, Main, Footer
│   │   │   ├── results/     # Tabelas, gráficos, comparação, exportação
│   │   │   ├── sharing/     # Botão WhatsApp
│   │   │   └── ui/          # Componentes genéricos
│   │   ├── hooks/           # useFinanciamento, useFormCalculator
│   │   ├── types/           # Interfaces TypeScript
│   │   └── utils/           # Cálculos, formatação, CSV
│   └── package.json
├── LICENSE
└── README.md
```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
