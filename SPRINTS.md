# Sprints — Calculadora de Financiamento Imobiliário

**Projeto:** Calculadora de Financiamento Imobiliário  
**Base:** PRD v1.3 + v1.4 + v1.5 (implementados e validados em 22/10/2026) + v1.6 (Redesign NectArr Design System — planejado em 31/10/2026)  
**Metodologia:** Sprints iterativas com entregas incrementais  
**Stack Frontend:** React 19 + TypeScript ~6.0 + Tailwind CSS 4.3 + Vite 8.1 (Chart.js 4.5, Vitest 5.0, OxLint 1.71)  
**Stack Infra/Containers (v1.5):** Docker Multi-Stage (`node:22-alpine` + `nginxinc/nginx-unprivileged:stable-alpine`) + Docker Compose  
**Design System (v1.6):** NectArr Design System (`design_system/design-system.html` — `Geist` + `Montserrat`, Brand Lime `#c1ff72`, Deep Navy `#002f43`, `stone`/`neutral`, `.glass-panel`, `.spotlight-card`, `.grid-lines`)  
**Status em 31/10/2026:** Sprints 1–22 implementadas e validadas (123 testes passando em 10 arquivos, OxLint/Prettier limpos, `dist/` ~460KB, containers `app`, `dev` e `test` operacionais); Sprints 23–28 planejadas para execução etapa por etapa do redesign v1.6.

---

## Visão Geral das Sprints

| Sprint | Fase | Foco | Entregas Principais |
|--------|------|------|---------------------|
| Sprint 1 | Setup | Fundação do projeto | Estrutura, tipos, layout base |
| Sprint 2 | MVP | Formulário | Campos, validação, estado |
| Sprint 3 | MVP | Motor de cálculos | SAC, Price, testes unitários |
| Sprint 4 | MVP | Exibição de resultados | Tabelas de amortização |
| Sprint 5 | MVP | Comparação | Valores totais, destaque visual |
| Sprint 6 | v1.1 | Visualização | Gráficos comparativos |
| Sprint 7 | v1.1 | Engajamento | WhatsApp, conteúdo educativo |
| Sprint 8 | v1.2 | Polish | Animações, SEO, performance |
| Sprint 9 | MVP | Paginação | Paginação de tabelas (20 itens/página) |
| Sprint 10 | MVP | Gráficos Adicionais | 3 gráficos: Juros, Amortização, Saldo Devedor |
| Sprint 11 | MVP | Exportação CSV | Botão exportar, geração de arquivo CSV |
| Sprint 12 | v1.3 | Refinos pós-MVP (não planejado) | Ponto de equilíbrio, % economia, taxa anual, atalhos, preview financiado, donut, lazy/FadeIn |
| Sprint 13 | v1.4-refator | Trava de segurança | Testes de caracterização, sem código produtivo |
| Sprint 14 | v1.4-refator | Derivados puros | `utils/analysis.ts` + testes; UI consome |
| Sprint 15 | v1.4-refator | Parsing único | `parseMoeda/Percentual` central; remove 6 duplicações |
| Sprint 16 | v1.4-refator | Validação pura | `constants/business.ts` + `domain/validation.ts`; hook fino |
| Sprint 17 | v1.4-refator | Fatiar componentes + bugfixes seguros | Sub-componentes; `Tabela`/`Grafico`/`InputField` |
| Sprint 18 | v1.4-refator | Higiene de arquitetura | Barrels, split `csv`, `chart.ts`, `sharing`, lint |
| Sprint 19 | v1.5-docker | Contexto e Servidor Web | `calculadora-fi/.dockerignore` + `calculadora-fi/nginx.conf` (SPA, cache, gzip, security headers) |
| Sprint 20 | v1.5-docker | Dockerfile Multi-Stage | `calculadora-fi/Dockerfile` com stages `base`, `dev`, `check`, `builder` e `prod` (non-root `8080`) |
| Sprint 21 | v1.5-docker | Orquestração Compose | `docker-compose.yml` na raiz com serviços `app` (`${PORT:-8080}:8080`), `dev` (HMR) e `test` (check) |
| Sprint 22 | v1.5-docker | Validação E2E e Docs | Smoke tests de containers (`prod`, `dev`, `test`), headers HTTP, healthcheck e atualização de `README.md`/`AGENTS.md` |
| Sprint 23 | v1.6-redesign | Fundação do Design System | Fontes `Geist`/`Montserrat` em `index.html`, tokens/utilitários CSS (`.glass-panel`, `.grid-lines`, `.spotlight-card`, `.glass-button`, animações) em `index.css` e helper `utils/spotlight.ts` |
| Sprint 24 | v1.6-redesign | App Shell, Header, Hero e Footer | Redesign de `App.tsx`, `Header.tsx` (`.glass-panel`), `Main.tsx`, `SimulationCard.tsx` (Hero editorial com sublinhado curvo SVG `#c1ff72`) e `Footer.tsx` (`rounded-3xl bg-neutral-50`) |
| Sprint 25 | v1.6-redesign | Formulário, Inputs, Atalhos e Preview | Redesign de `InputField.tsx`, `DownPaymentShortcuts.tsx`, `TermShortcuts.tsx`, `PrincipalPreview.tsx` e `FormCalculator.tsx` (CTA pílula `stone-900`/`#c1ff72`) |
| Sprint 26 | v1.6-redesign | Resultados, Recomendação e Gráficos | Redesign de `RecommendationCard.tsx`, `WhatsAppShareButton.tsx`, `ResultHeader.tsx` (`.spotlight-card`), `ChartsGrid.tsx`, `LineChart.tsx` e paleta `utils/chart.ts` (`#65a30d`/`#002f43`) |
| Sprint 27 | v1.6-redesign | Tabelas, Paginação, CSV e Educativo | Redesign de `TableTabs.tsx`, `ExportCSVButton.tsx`, `AmortizationTable.tsx` (`.ds-spec-table`), `Pagination.tsx` e suite `education/*` (`EducationalContent`, `EducationTabs`, `SystemPanel`, `ComparisonTable`) |
| Sprint 28 | v1.6-redesign | Assets, Regressão, Screenshots e QA Final | Atualização de `favicon.svg` e `og-image.svg`, verificação de zero classes `slate/blue/emerald` residuais, 123+ testes Vitest, recaptura de `docs/screenshots/*.png` e smoke test Docker |

---

## Sprint 1 — Fundação do Projeto

**Objetivo:** Estruturar o projeto com todas as ferramentas e configurações necessárias.

### Tarefas

| ID | Tarefa | Prioridade | Critério de Aceite |
|----|--------|------------|-------------------|
| S1-01 | Inicializar projeto com Vite + React + TypeScript | Must | `npm run dev` funciona sem erros |
| S1-02 | Configurar Tailwind CSS | Must | Classes utilitárias funcionam |
| S1-03 | Definir estrutura de pastas (components, hooks, utils, types) | Must | Pastas criadas seguindo arquitetura por funcionalidade |
| S1-04 | Criar interfaces TypeScript baseadas no modelo de domínio | Must | `Financiamento`, `Resultado`, `Parcela` definidos |
| S1-05 | Criar layout base (Header, Main, Footer) | Must | Layout responsivo com container |
| S1-06 | Configurar ESLint + Prettier | Must | Linting funciona sem erros |
| S1-07 | Criar componente de输入 genérico (`InputField`) | Must | Componente reutilizável com label e validação |

### Entregas
- Projeto inicializado e rodando
- Estrutura de pastas definida
- Tipos TypeScript criados
- Layout base responsivo

### Dependências
- Nenhuma

---

## Sprint 2 — Formulário de Entrada

**Objetivo:** Implementar o formulário completo com validação seguindo as regras de negócio.

### Tarefas

| ID | Tarefa | Prioridade | Critério de Aceite |
|----|--------|------------|-------------------|
| S2-01 | Componente `FormField` para campos monetários (R$) | Must | Formatação brasileira automática |
| S2-02 | Campo "Valor do Imóvel" | Must | Aceita valores > 0, formata moeda |
| S2-03 | Campo "Entrada" | Must | Aceita valores >= 20% do imóvel, < valor do imóvel |
| S2-04 | Campo "Taxa de Juros" | Must | Aceita valores >= 0, até 2 casas decimais |
| S2-05 | Campo "Prazo" | Must | Aceita inteiros > 0, máximo 600 meses |
| S2-06 | Validação de campos (RN-001 a RN-006) | Must | Mensagens de erro exibidas corretamente |
| S2-07 | Botão "Calcular" | Must | Habilitado apenas quando válido |
| S2-08 | Botão "Limpar" | Must | Reseta todos os campos |
| S2-09 | Hook `useFormCalculator` para gerenciar estado | Must | Estado centralizado e tipado |

### Entregas
- Formulário completo e funcional
- Validação seguindo regras de negócio
- Estados gerenciados via hook customizado

### Dependências
- Sprint 1 (tipos, layout, componente base)

---

## Sprint 3 — Motor de Cálculos

**Objetivo:** Implementar a lógica de cálculo para SAC e Price com testes unitários.

### Tarefas

| ID | Tarefa | Prioridade | Critério de Aceite |
|----|--------|------------|-------------------|
| S3-01 | Função `calcularSAC(valorFinanciado, taxaJuros, prazo)` | Must | Retorna array de parcelas SAC |
| S3-02 | Função `calcularPrice(valorFinanciado, taxaJuros, prazo)` | Must | Retorna array de parcelas Price |
| S3-03 | Função `calcularTotais(tabela)` | Must | Calcula totalPago e totalJuros |
| S3-04 | Função `compararFinanciamentos(sac, price)` | Must | Retorna melhorOpcao e economia |
| S3-05 | Hook `useFinanciamento` que orquestra tudo | Must | Integra formulário com cálculos |
| S3-06 | Testes unitários SAC | Must | 100% cobertura da função |
| S3-07 | Testes unitários Price | Must | 100% cobertura da função |
| S3-08 | Validação com planilha de referência | Must | Resultados conferem |

### Entregas
- Funções de cálculo SAC e Price
- Hook de integração
- Testes unitários com cobertura completa

### Dependências
- Sprint 2 (formulário e validações)

---

## Sprint 4 — Tabelas de Amortização

**Objetivo:** Exibir tabelas completas de amortização para ambos os sistemas.

### Tarefas

| ID | Tarefa | Prioridade | Critério de Aceite |
|----|--------|------------|-------------------|
| S4-01 | Componente `TabelaAmortizacao` genérico | Must | Reutilizável para SAC e Price |
| S4-02 | Colunas: Mês, Amortização, Juros, Parcela, Saldo Devedor | Must | Todos os campos exibidos |
| S4-03 | Formatação monetária brasileira nas células | Must | R$ X.XXX,XX em todas |
| S4-04 | Tabela responsiva (scroll horizontal em mobile) | Must | Funciona em 320px |
| S4-05 | Exibir tabela SAC | Must | Todos os meses do prazo |
| S4-06 | Exibir tabela Price | Must | Todos os meses do prazo |
| S4-07 | Componente `ResultadoHeader` com totais | Must | Exibe totalPago e totalJuros |

### Entregas
- Componente de tabela reutilizável
- Tabelas SAC e Price completas
- Layout responsivo para tabelas

### Dependências
- Sprint 3 (motor de cálculos)

---

## Sprint 5 — Comparação e Destaque

**Objetivo:** Comparar visualmente os dois sistemas e destacar a melhor opção.

### Tarefas

| ID | Tarefa | Prioridade | Critério de Aceite |
|----|--------|------------|-------------------|
| S5-01 | Componente `ComparacaoFinanciamento` | Must | Mostra SAC vs Price lado a lado |
| S5-02 | Cards com valores totais | Must | Total SAC vs Total Price em R$ |
| S5-03 | Destaque visual do mais econômico | Must | Border/background diferenciado |
| S5-04 | Exibir economia em R$ | Must | Diferença entre totais |
| S5-05 | Mensagem "Melhor opção: SAC/Price" | Must | Texto claro e visível |
| S5-06 | Seção de resultados com abas/tabs | Must | Usuário pode alternar entre tabelas |

### Entregas
- Componente de comparação
- Destaque visual do melhor sistema
- Exibição da economia

### Dependências
- Sprint 4 (tabelas de amortização)

---

## Sprint 6 — Gráficos Comparativos (v1.1)

**Objetivo:** Adicionar visualização gráfica da evolução das parcelas.

### Tarefas

| ID | Tarefa | Prioridade | Critério de Aceite |
|----|--------|------------|-------------------|
| S6-01 | Instalar e configurar Chart.js | Must | Biblioteca disponível |
| S6-02 | Componente `GraficoComparativo` | Should | Gráfico de linha/barra |
| S6-03 | Série SAC: parcelas ao longo do tempo | Should | Linha visível e legenda |
| S6-04 | Série Price: parcelas ao longo do tempo | Should | Linha visível e legenda |
| S6-05 | Responsividade do gráfico | Should | Adaptável a mobile |
| S6-06 | Tooltip interativo | Should | Mostra valores ao hover |

### Entregas
- Gráfico comparativo SAC vs Price
- Gráfico responsivo e interativo

### Dependências
- Sprint 5 (comparação funcional)

---

## Sprint 7 — Compartilhamento e Conteúdo Educativo (v1.1)

**Objetivo:** Adicionar compartilhamento via WhatsApp e conteúdo explicativo.

### Tarefas

| ID | Tarefa | Prioridade | Critério de Aceite |
|----|--------|------------|-------------------|
| S7-01 | Botão "Compartilhar via WhatsApp" | Should | Abre WhatsApp com mensagem |
| S7-02 | Formatar mensagem com resultados | Should | Inclui valores SAC/Price |
| S7-03 | Seção "O que é SAC?" | Could | Texto claro e didático |
| S7-04 | Seção "O que é Price?" | Could | Texto claro e didático |
| S7-05 | Quadro comparativo SAC vs Price | Could | Diferenças principais |
| S7-06 | Estilização do conteúdo educativo | Could | Design consistente |

### Entregas
- Funcionalidade de compartilhamento
- Conteúdo educativo completo

### Dependências
- Sprint 5 (resultados disponíveis)

---

## Sprint 8 — Polish e Otimização (v1.2)

**Objetivo:** Polir a experiência com animações, SEO e performance.

### Tarefas

| ID | Tarefa | Prioridade | Critério de Aceite |
|----|--------|------------|-------------------|
| S8-01 | Animações de transição entre seções | Could | Transições suaves |
| S8-02 | Animação ao exibir resultados | Could | Fade/slide in |
| S8-03 | Meta tags SEO (title, description, OG) | Could | Tags presentes |
| S8-04 | Open Graph para compartilhamento | Could | Preview no WhatsApp |
| S8-05 | Lazy loading de componentes pesados | Must | Performance < 100ms |
| S8-06 | Otimização de bundle size | Must | < 500KB total |
| S8-07 | Testes cross-browser (Chrome, Firefox, Safari, Edge) | Must | Funciona em todos |
| S8-08 | Auditoria de acessibilidade | Should | Labels, contraste, navegação teclado |
| S8-09 | Testes em dispositivos móveis reais | Must | UX adequada |

### Entregas
- Animações de transição
- SEO otimizado
- Performance validada
- Compatibilidade cross-browser

### Dependências
- Sprint 7 (funcionalidades completas)

---

## Sprint 9 — Paginação de Tabelas

**Objetivo:** Implementar paginação nas tabelas de amortização para melhorar a visualização em simulações extensas.

### Tarefas

| ID | Tarefa | Prioridade | Critério de Aceite |
|----|--------|------------|-------------------|
| S9-01 | Componente `Paginacao` genérico | Should | Navegação entre páginas funcional |
| S9-02 | Paginação com 20 itens por página | Should | Tabela mostra 20 linhas máximo por vez |
| S9-03 | Controle de página atual (state) | Should | Estado da página atual gerenciado |
| S9-04 | Botões Anterior e Próximo | Should | Navegação funcional com Disable quando aplicável |
| S9-05 | Exibição "Página X de Y" | Should | Usuário consegue identificar sua posição |
| S9-06 | Aplicar paginação na tabela SAC | Should | Tabela SAC paginada corretamente |
| S9-07 | Aplicar paginação na tabela Price | Should | Tabela Price paginada corretamente |
| S9-08 | Paginação aparece apenas quando > 20 itens | Should | Se <= 20 itens, sem paginação visível |

### Entregas
- Componente de paginação reutilizável
- Tabelas SAC e Price paginadas
- UX melhorada para simulações longas

### Dependências
- Sprint 4 (tabelas de amortização)

---

## Sprint 10 — Gráficos Adicionais

**Objetivo:** Adicionar 3 novos gráficos comparativos além do gráfico de parcelas já existente.

### Tarefas

| ID | Tarefa | Prioridade | Critério de Aceite |
|----|--------|------------|-------------------|
| S10-01 | Componente `GraficoJuros` | Should | Gráfico de linha: evolução dos juros SAC vs Price |
| S10-02 | Série SAC: juros ao longo do tempo | Should | Linha visível e legenda correta |
| S10-03 | Série Price: juros ao longo do tempo | Should | Linha visível e legenda correta |
| S10-04 | Componente `GraficoAmortizacao` | Should | Gráfico de linha: evolução da amortização SAC vs Price |
| S10-05 | Série SAC: amortização ao longo do tempo | Should | Linha visível e legenda correta |
| S10-06 | Série Price: amortização ao longo do tempo | Should | Linha visível e legenda correta |
| S10-07 | Componente `GraficoSaldoDevedor` | Should | Gráfico de linha: evolução do saldo devedor SAC vs Price |
| S10-08 | Série SAC: saldo devedor ao longo do tempo | Should | Linha visível e legenda correta |
| S10-09 | Série Price: saldo devedor ao longo do tempo | Should | Linha visível e legenda correta |
| S10-10 | Layout responsivo dos 3 gráficos | Should | Adaptável a mobile (320px) |
| S10-11 | Tooltips interativos | Should | Mostra valores ao hover |

### Entregas
- 3 novos gráficos comparativos
- Gráficos responsivos e interativos

### Dependências
- Sprint 6 (gráficos comparativos)

---

## Sprint 11 — Exportação CSV

**Objetivo:** Implementar botão para exportar dados das tabelas SAC e Price em formato CSV.

### Tarefas

| ID | Tarefa | Prioridade | Critério de Aceite |
|----|--------|------------|-------------------|
| S11-01 | Função `gerarCSV(tabela, separador)` | Should | Gera string CSV válida |
| S11-02 | Cabeçalhos: Mês, Amortização, Juros, Parcela, Saldo Devedor | Should | Cabeçalhos corretos no arquivo |
| S11-03 | Separador ponto e vírgula (;) e decimal vírgula | Should | Formato brasileiro (1.000,00) |
| S11-04 | Função `downloadCSV(conteudo, nomeArquivo)` | Should | Download dispara automaticamente |
| S11-05 | Componente `BotaoExportarCSV` | Should | Botão visível e funcional |
| S11-06 | Alinhar botão à direita das abas (SAC/Price) | Should | Layout conforme especificado |
| S11-07 | Exportar dados SAC completos | Should | Arquivo contém tabela SAC |
| S11-08 | Exportar dados Price completos | Should | Arquivo contém tabela Price |
| S11-09 | Exportar ambas as tabelas juntas | Should | Arquivo contém SAC e Price separados por seção |
| S11-10 | Validar CSV no Excel/Google Sheets | Should | Dados formatados corretamente |

### Entregas
- Função de geração de CSV
- Botão de exportação
- Validação com planilhas

### Dependências
- Sprint 4 (tabelas de amortização)

---

## Sprint 12 — Refinos pós-MVP (executado, não planejado)

**Objetivo:** Registrar melhorias implementadas além do plano Sprints 1-11, identificadas em auditoria de 22/10/2026.

### Tarefas (todas já implementadas, pendente teste formal/cobertura)

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S12-01 | Ponto de equilíbrio SAC vs Price | `FinancingComparison.tsx` (`mesCruzamento`) | Exibe "a partir do NNNº mês" |
| S12-02 | Percentual de economia | `FinancingComparison.tsx` (`percentualEconomia`) | Exibe `-X,X%` |
| S12-03 | Taxa anual equivalente | `FormCalculator.tsx` | Exibe `≈ X,XX% a.a.` |
| S12-04 | Atalhos entrada/prazo | `FormCalculator.tsx` | Botões preenchem campo |
| S12-05 | Preview valor financiado | `FormCalculator.tsx` | Exibe principal + % antes de calcular |
| S12-06 | Donut composição amortização/juros | `ResultHeader.tsx` | Texto/gráfico por sistema |
| S12-07 | Lazy loading + FadeIn | `App.tsx`, `ui/FadeIn.tsx` | `lazy`+`Suspense` em Comparação/Educativo |

### Entregas
- 7 refinamentos funcionais em produção local
- Pendente: testes unitários dedicados (S12-01 a S12-07) e commit por escopo

### Dependências
- Sprints 2, 5, 6, 8

---

## Sprint 13 — Trava de Segurança (caracterização, sem código produtivo)

**Objetivo:** Travar o comportamento atual antes de qualquer refatoração (RFR-001). Nenhum arquivo produtivo muda nesta sprint.

### Tarefas

| ID | Tarefa | Critério de Aceite |
|----|--------|-------------------|
| S13-01 | Criar `src/utils/__tests__/analysis.test.ts` com casos de caracterização | Cobre `mesCruzamento` (SAC cruza Price, nunca cruza → `null`, `economia=0`), `%economia` (formato `X,X%`), `principal`, `taxaAnual`, `prazoAnos`, `preview` (regra 20%) |
| S13-02 | Criar `src/domain/__tests__/validation.test.ts` vazio ou com casos atuais | Espelha mensagens pt-BR atuais (entrada mínima, taxa >20, prazo >600) como baseline |
| S13-03 | Rodar baseline | `npx vitest run` com 53 testes existentes PASS; novos testes FAIL (funções ainda não existem) — documentar saída |

### Entregas
- 2 arquivos de teste de caracterização (vermelhos, aguardando Sprint 14/16)
- Evidência de baseline registrada

### Dependências
- Sprints 3, 4, 5 (comportamento a travar)

---

## Sprint 14 — Derivados Puros (`utils/analysis.ts`)

**Objetivo:** Remover toda lógica derivada de UI para funções puras testadas (RFR-002). Núcleo `calculations.ts` intocado.

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S14-01 | Criar `src/utils/analysis.ts`: `calcularMesCruzamento(tabelaSAC, tabelaPrice): number \| null` | Novo | Scan linear extraído de `FinancingComparison.tsx:19-28`, sem `useMemo` |
| S14-02 | `calcularPercentualEconomia(economia, maiorTotal): string` + `calcularValorPrincipal(totalPago, totalJuros): number` | Novo | Substitui `Comparacao:30-37` e `ResultadoHeader:19-25`; formato `pt-BR 1 casa` via `format.ts` |
| S14-03 | `calcularTaxaAnualEquivalente(taxaMensal)`, `formatarPrazoEmAnos(prazo)`, `calcularPercentualEntrada()`, `calcularValorFinanciadoPreview()` | Novo | Extraídos de `FormCalculator.tsx:34-62`; recebem números, não strings mascaradas |
| S14-04 | Refatorar consumidores | `FinancingComparison.tsx`, `ResultHeader.tsx`, `FormCalculator.tsx` | UI só chama `analysis.ts`; S13-01 fica verde sem alterar snapshots |
| S14-05 | Verificação | `calculadora-fi/` | `npx vitest run src/utils/__tests__/analysis.test.ts` PASS + `npm run build` OK |

### Entregas
- `analysis.ts` + testes verdes; 3 componentes sem `Math.pow/toLocaleString/scan` inline

### Dependências
- Sprint 13 (testes vermelhos)

---

## Sprint 15 — Parsing Único (`format.ts`)

**Objetivo:** Centralizar parsing/formatação e eliminar 6 duplicações (RFR-003).

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S15-01 | Adicionar `parseMoedaParaNumero(str): number`, `parsePercentualParaNumero(str): number`, `formatarPercentual(valor, casas=1): string` | `src/utils/format.ts` | Inversas exatas da máscara `/100`; `''` → `0`/`NaN` documentado |
| S15-02 | Substituir parsing manual | `useFormCalculator.ts:37-38,157-158`, `FormCalculator.tsx:29-31` | Zero ocorrências de `replace(/\./g,'')` fora de `format.ts` (`rg` comprova) |
| S15-03 | Substituir `toLocaleString` ad-hoc | `FormCalculator.tsx:36,44`, `FinancingComparison.tsx:33` | Tudo via `format.ts`/`analysis.ts` |
| S15-04 | Estender testes | `src/utils/__tests__/format.test.ts` | Casos `30000000→300.000,00`, `085→0,85`, `''`, `0,00`, round-trip máscara→parse |
| S15-05 | Verificação | `calculadora-fi/` | `npx vitest run src/utils/__tests__/format.test.ts src/hooks/__tests__/useFormCalculator.test.ts src/components/form/__tests__/FormCalculator.test.tsx` PASS |

### Entregas
- Parsing único + testes; `grep` sem duplicação residual

### Dependências
- Sprint 14 (assinaturas de `analysis.ts` estáveis)

---

## Sprint 16 — Validação Pura (`domain/validation.ts`)

**Objetivo:** Desacoplar regra de negócio de máscara/UI (RFR-004).

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S16-01 | Criar `src/constants/business.ts` | Novo | `ENTRADA_MINIMA=0.2, TAXA_MAXIMA=20, PRAZO_MAXIMO=600, ITENS_POR_PAGINA=20` + `ENTRADAS_SUGERIDAS/PRAZOS_SUGERIDOS` (movidos de `FormCalculator`) |
| S16-02 | Criar `src/domain/validation.ts`: `validateFinanciamento({valorImovel, entrada, taxaJuros, prazoMeses}: numbers, minimoFormatado?: string)` | Novo | Puro, sem importar `format.ts`; mensagens pt-BR idênticas às atuais |
| S16-03 | Afinar `useFormCalculator` | `src/hooks/useFormCalculator.ts` | Vira adaptador: parse (`format.ts`) → valida (`domain`) → formata mensagem; unifica `handleChange/handleBlur` via helper `revalidarCruzada()`; elimina `formatarEntradaMoeda()` de dentro de `validate()` |
| S16-04 | Cobrir bordas | `src/domain/__tests__/validation.test.ts`, `src/hooks/__tests__/useFormCalculator.test.ts` | `entrada>=valor`, `prazo>600/<=0`, `valor<=0`, revalidação cruzada `valorImovel→entrada` |
| S16-05 | Verificação | `calculadora-fi/` | `npx vitest run src/domain src/hooks` PASS; mensagens inalteradas |

### Entregas
- Validador puro + constantes; hook fino sem lógica de negócio inline

### Dependências
- Sprint 15 (parsing central disponível)

---

## Sprint 17 — Fatiar Componentes + Bugfixes Seguros

**Objetivo:** Quebrar 3 arquivos >200 linhas e corrigir 2 anti-patterns sem mudar pixels (RFR-005/RFR-006).

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S17-01 | Fatiar `FinancingComparison.tsx:244` | Novos `results/RecommendationCard.tsx` + `ChartsGrid.tsx` + `TableTabs.tsx` | Orquestrador ~60 linhas; tabs `SAC/PRICE` + `BotaoExportarCSV` preservados; `key="sac-table"/"price-table"` mantido |
| S17-02 | Fatiar `FormCalculator.tsx:228` | Novos `form/DownPaymentShortcuts.tsx` + `TermShortcuts.tsx` + `PrincipalPreview.tsx` | Atalhos 20/30/40/50% e 120/240/360/420m + preview idênticos; botão `disabled=!isValid` inalterado |
| S17-03 | Fatiar `EducationalContent.tsx:286` | Novos `education/content.ts` + `SystemPanel.tsx` (prop `variante`) + `ComparisonTable.tsx` + `EducationTabs.tsx` | `PainelSAC`/`PainelPrice` unificados; tabela `critério/SAC/Price` idêntica |
| S17-04 | Extrair `SimulationCard.tsx` | Novo `layout/SimulationCard.tsx` (de `App.tsx:32-58`) | Gradiente + badges `SAC/Price` pixel-idênticos; `App` só compõe `Header/Main/Footer` + `lazy` |
| S17-05 | Fix `AmortizationTable.tsx:17-20` | `results/AmortizationTable.tsx` | Troca `setState` durante render por `useEffect(() => setPaginaAtual(1), [dados])`; teste `45→12` (`AmortizationTable.test.tsx`) continua PASS; sem warning `StrictMode` |
| S17-06 | Fix `LineChart.tsx` + `InputField` | `results/LineChart.tsx`, `ui/InputField.tsx` | `options` declara dep `rotuloEixoY` ou remove prop morta; `registerChart()` vai para `utils/chart.ts` (Sprint 18 pode completar); `forwardRef` removido (React 19); 4 gráficos renderizam igual |
| S17-07 | Verificação + screenshots | `calculadora-fi/`, `docs/screenshots/` | `npx vitest run` total PASS + `npm run build` OK + recaptura manual `dev` + fill + screenshot se qualquer pixel mudou (per AGENTS.md) |

### Entregas
- 8–10 componentes ≤ ~150 linhas; 2 bugfixes sem mudança visual

### Dependências
- Sprints 14–16 (lógica já pura; fatiamento só move JSX)

---

## Sprint 18 — Higiene de Arquitetura

**Objetivo:** Fechar fronteiras, padronizar imports e elevar lint sem mudar comportamento.

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S18-01 | Padronizar barrels | `*/index.ts` | Uma convenção (tudo via barrel OU tudo relativo); `App` e `Comparacao` consistentes; `tsc -b` OK |
| S18-02 | Split `csv.ts` | Novo `src/utils/csvDownload.ts` | `gerarCSV/Completo` ficam puros; `downloadCSV` (Blob+BOM+`URL`) isolado + teste de falha `createObjectURL`; formato `;`/`,`/`BOM` inalterado (Excel/Sheets) |
| S18-03 | Centralizar chart | Novo `src/utils/chart.ts` | Cores `SAC #059669/PRICE #2563eb`, `registerChart()`, `tooltip` pt-BR; `GraficoLinha` só consome |
| S18-04 | Resolver `sharing/` | `sharing/` → `results/` ou documentar | Ou move `WhatsAppShareButton:60` para `results/` ou registra decisão de manter; mensagem WhatsApp inalterada |
| S18-05 | Limpeza deps/lint | `package.json`, `.oxlintrc.json` | Remove `user-event` se sem uso; ativa gradualmente `no-unused-vars`/`correctness`; `npm run lint` zero errors |
| S18-06 | Verificação final v1.4 | `calculadora-fi/` | `npm run lint && npm run format:check && npm run build` OK; `dist/` ~464KB (±10%); 53 testes originais + novos todos PASS |

### Entregas
- Arquitetura final conforme PRD §28.3; `dist/` e testes verdes

### Dependências
- Sprint 17 (componentes finais estáveis)

---

## Sprint 19 — Contexto Docker e Servidor Web (`nginx.conf` + `.dockerignore`)

**Objetivo:** Isolar o contexto de build do Docker e configurar o servidor Nginx para servir a SPA estática com alta performance e segurança (DKR-001, DKR-006).

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S19-01 | Criar `.dockerignore` | `calculadora-fi/.dockerignore` | Exclui `node_modules/`, `dist/`, `dist-ssr/`, `coverage/`, `*.log`, `.git/`, `.vscode/`, `.idea/` e `.env*` |
| S19-02 | Configurar servidor SPA na porta `8080` | `calculadora-fi/nginx.conf` | `listen 8080;`, `root /usr/share/nginx/html;`, `index index.html;` e `try_files $uri $uri/ /index.html;` |
| S19-03 | Configurar compressão Gzip | `calculadora-fi/nginx.conf` | `gzip on; gzip_vary on; gzip_min_length 1024;` cobrindo `text/plain`, `text/css`, `application/javascript`, `application/json`, `image/svg+xml` |
| S19-04 | Configurar política de cache HTTP | `calculadora-fi/nginx.conf` | `/assets/` com `expires 1y; add_header Cache-Control "public, immutable";` e `/index.html`, `/favicon.svg`, `/og-image.svg` com `add_header Cache-Control "no-cache";` |
| S19-05 | Configurar headers de segurança HTTP | `calculadora-fi/nginx.conf` | `server_tokens off;`, `X-Content-Type-Options "nosniff"`, `X-Frame-Options "SAMEORIGIN"`, `Referrer-Policy "strict-origin-when-cross-origin"` |

### Entregas
- `calculadora-fi/.dockerignore` enxuto e seguro
- `calculadora-fi/nginx.conf` otimizado para Vite SPA + Nginx non-root (`8080`)

### Dependências
- Sprint 18 (estrutura de build estática consolidada)

---

## Sprint 20 — Dockerfile Multi-Stage (`base`, `dev`, `check`, `builder`, `prod`)

**Objetivo:** Construir um `Dockerfile` multi-stage em `calculadora-fi/` que atenda desenvolvimento, verificação de qualidade e produção enxuta sem privilégios de `root` (DKR-002 a DKR-006).

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S20-01 | Implementar stage `base` | `calculadora-fi/Dockerfile` | Usa `node:22-alpine`, define `WORKDIR /app`, copia `package.json` + `package-lock.json` e executa `npm ci` com cache de camada |
| S20-02 | Implementar stage `dev` | `calculadora-fi/Dockerfile` | Herda de `base`, copia código-fonte, `EXPOSE 5173` e define `CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]` |
| S20-03 | Implementar stage `check` | `calculadora-fi/Dockerfile` | Herda de `base`, copia arquivos do projeto e define `CMD ["sh", "-c", "npm run lint && npm run format:check && npm run test"]` |
| S20-04 | Implementar stage `builder` | `calculadora-fi/Dockerfile` | Herda de `base`, copia código-fonte e executa `RUN npm run build` (`tsc -b && vite build`), gerando `/app/dist` |
| S20-05 | Implementar stage `prod` | `calculadora-fi/Dockerfile` | Usa `nginxinc/nginx-unprivileged:stable-alpine`, copia `nginx.conf` para `/etc/nginx/conf.d/default.conf`, copia `--from=builder /app/dist /usr/share/nginx/html`, `EXPOSE 8080` e define `HEALTHCHECK` via `wget -q --spider http://127.0.0.1:8080/ \|\| exit 1` |

### Entregas
- `calculadora-fi/Dockerfile` completo com 5 estágios modulares

### Dependências
- Sprint 19 (`.dockerignore` e `nginx.conf` prontos)

---

## Sprint 21 — Orquestração com Docker Compose (`app`, `dev`, `test`)

**Objetivo:** Permitir subir o ambiente de produção, desenvolvimento com HMR ou a suíte de testes diretamente da raiz do repositório com um único comando (DKR-007).

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S21-01 | Criar `docker-compose.yml` na raiz | `docker-compose.yml` | Contexto de build apontando para `./calculadora-fi` |
| S21-02 | Configurar serviço `app` (produção padrão) | `docker-compose.yml` | `target: prod`, mapeamento `"${PORT:-8080}:8080"`, `restart: unless-stopped`, healthcheck ativo |
| S21-03 | Configurar serviço `dev` (profile `dev`) | `docker-compose.yml` | `profiles: ["dev"]`, `target: dev`, porta `"${DEV_PORT:-5173}:5173"`, bind mounts de `./calculadora-fi/src:/app/src`, `./calculadora-fi/public:/app/public`, `./calculadora-fi/index.html:/app/index.html` preservando `/app/node_modules` do container |
| S21-04 | Configurar serviço `test` (profile `test`) | `docker-compose.yml` | `profiles: ["test"]`, `target: check` para rodar OxLint + Prettier + Vitest sob demanda |

### Entregas
- `docker-compose.yml` na raiz do repositório com suporte a `PORT` customizável e profiles `dev`/`test`

### Dependências
- Sprint 20 (`Dockerfile` multi-stage concluído)

---

## Sprint 22 — Validação End-to-End de Containers e Documentação

**Objetivo:** Verificar todos os estágios e serviços Docker em execução real e atualizar a documentação do projeto (DKR-008).

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S22-01 | Validar suíte de qualidade em container (`test`) | Terminal / Docker | `docker compose --profile test run --rm --build test` executa OxLint, Prettier (`format:check`) e Vitest (123/123 testes passando) com exit code `0` |
| S22-02 | Validar imagem e container de produção (`app`) | Terminal / Docker | `docker compose up -d --build app` sobe container `healthy`; imagem final `< 60MB` comprimida (~25,7MB `CONTENT SIZE` / ~90,8MB `DISK USAGE`); `curl -I http://localhost:8080` retorna `200 OK` com headers de segurança, `Cache-Control: no-cache` no HTML e `immutable` nos assets `/assets/*.js` |
| S22-03 | Validar container de desenvolvimento (`dev`) | Terminal / Docker | `docker compose --profile dev up -d --build dev` responde `200 OK` em `http://localhost:5173` servindo a aplicação via Vite HMR |
| S22-04 | Atualizar documentação do projeto | `README.md`, `calculadora-fi/README.md`, `AGENTS.md` | Comandos de execução via Docker (produção, porta customizada, dev HMR e testes) documentados de forma clara |

### Entregas
- Ambientes `prod`, `dev` e `test` validados ponta a ponta
- Documentação atualizada em `README.md`, `calculadora-fi/README.md` e `AGENTS.md`

### Dependências
- Sprint 21 (`docker-compose.yml` configurado)

---

## Sprint 23 — Fundação do Design System (`index.html`, `index.css` e `spotlight.ts`)

**Objetivo:** Estabelecer a base tipográfica (`Geist` + `Montserrat`), tokens de cor, classes de superfície (`.glass-panel`, `.glass-panel-dark`, `.grid-lines`), efeitos interativos (`.spotlight-card`, `.glass-button`, `.button-shine`) e animações do `design_system/design-system.html` (RDS-001, RDS-002, RDS-004).

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S23-01 | Substituir Google Fonts para `Geist` e `Montserrat` e atualizar `theme-color` | `calculadora-fi/index.html` | Carrega `Geist:wght@300;400;500;600;700` e `Montserrat:wght@300;400;500;600;700`; `<meta name="theme-color" content="#1c1917" />` |
| S23-02 | Configurar tipografia base e classes `.font-geist`, `.font-montserrat`, `.font-google-sans-flex` | `calculadora-fi/src/index.css` | `html` usa `Geist` (`color: #1c1917`, `background-color: #f5f5f5`); `.font-google-sans-flex` aplica `letter-spacing: -0.04em` |
| S23-03 | Implementar classes de superfície `.glass-panel`, `.glass-panel-dark`, `.grid-lines` e `.no-scrollbar` | `calculadora-fi/src/index.css` | `.glass-panel` (`rgba(255,255,255,0.6)`, `blur(16px)`), `.glass-panel-dark` (`rgba(23,23,23,0.8)`, `blur(16px)`) e `.grid-lines` (`40px × 40px`, `rgba(0,0,0,0.03)`) fiéis ao `design-system.html` |
| S23-04 | Implementar `.spotlight-card`, `.glass-button` e `.button-shine` (`@property --angle-1/--angle-2`) | `calculadora-fi/src/index.css` | `.spotlight-card::before` renderiza gradiente radial `800px` em `rgba(193,255,114,0.15)` nas variáveis `--mouse-x` e `--mouse-y`; `.glass-button` aplica sombras internas e `.button-shine` |
| S23-05 | Configurar keyframes e classes de animação (`animate-clip-in`, `animate-fade-up`, `animate-float`, `animate-pulse-slow`) | `calculadora-fi/src/index.css`, `src/components/ui/FadeIn.tsx` | Animações funcionam conforme especificação `05 — Motion` do `design-system.html` e respeitam `motion-reduce:animate-none` |
| S23-06 | Criar helper `handleSpotlightMouseMove` para tracking de cursor em cards | `calculadora-fi/src/utils/spotlight.ts` | Função tipada `React.MouseEvent<HTMLElement>` que calcula `clientX - rect.left` / `clientY - rect.top` e define `--mouse-x` e `--mouse-y` via `currentTarget.style.setProperty` sem re-render |
| S23-07 | Verificação da Sprint 23 | `calculadora-fi/` | `npm run lint && npm run format:check && npm run test && npm run build` passam sem erros |

### Entregas
- Fontes `Geist` e `Montserrat` ativas
- Folha de estilos `src/index.css` com todos os tokens, superfícies e animações do NectArr Design System
- Helper `src/utils/spotlight.ts` pronto para consumo nos componentes

### Dependências
- Sprints 1–22 concluídas

---

## Sprint 24 — Redesign do App Shell, Header, Hero Simulador e Footer

**Objetivo:** Transformar a moldura da aplicação (`App`, `Header`, `Main`, `SimulationCard` e `Footer`) para a estética arquitetônica do `design-system.html` com grade `.grid-lines`, cabeçalho `.glass-panel`, seção de abertura estilo Hero NectArr e rodapé em card `rounded-3xl` (RDS-001, RDS-002, RDS-003).

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S24-01 | Atualizar `App.tsx` com superfície `bg-neutral-100`, seleção `#c1ff72` e overlay `.grid-lines` | `src/App.tsx` | Wrapper raiz usa `min-h-screen overflow-x-hidden selection:bg-[#c1ff72] selection:text-neutral-900 text-neutral-900 font-geist bg-neutral-100 relative`, inclui `<div className="fixed grid-lines w-full h-[100vh] top-0 right-0 left-0 pointer-events-none z-0" aria-hidden="true" />` e spinner `LoadingFallback` em `border-stone-200 border-t-stone-900` |
| S24-02 | Redesenhar `Header.tsx` no padrão `.glass-panel` do NectArr | `src/components/layout/Header.tsx` | Header `sticky top-0 z-40 glass-panel border-b border-stone-200/50`; logo `CFI` com `font-google-sans-flex text-2xl lg:text-3xl font-semibold tracking-tighter` e badge `#c1ff72`; links de ancoragem (`#simulador`, `#resultados`, `#educativo`) em `font-montserrat text-sm font-medium text-stone-600 hover:text-stone-900`; pílula de status `bg-white border-stone-200 text-stone-600` com dot `bg-[#c1ff72] animate-pulse` |
| S24-03 | Ajustar `Main.tsx` para o grid e espaçamento NectArr | `src/components/layout/Main.tsx` | Container `relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12` |
| S24-04 | Redesenhar `SimulationCard.tsx` inspirado na seção Hero (`00 — Hero`) | `src/components/layout/SimulationCard.tsx` | Cabeçalho com pílula de status (`w-2 h-2 rounded-full bg-[#c1ff72] animate-pulse`), título com destaque `font-google-sans-flex` e sublinhado curvo SVG em `#c1ff72`, subtítulo em `font-montserrat text-stone-500`, badges `SAC` (`bg-[#c1ff72] border-[#aae65f] text-stone-900`) e `Price` (`bg-[#002f43] text-white`), e container `bg-white rounded-[32px] border border-stone-200 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]` |
| S24-05 | Redesenhar `Footer.tsx` no padrão de card `rounded-3xl` do `design-system.html` | `src/components/layout/Footer.tsx` | Container `max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pb-8 mt-12` contendo `border rounded-3xl p-8 lg:p-12 shadow-sm bg-neutral-50 border-stone-200`, marca `CFI` com destaque lime, descrição em `font-montserrat text-stone-500` e barra inferior `border-t border-stone-200 text-stone-400 text-xs` |
| S24-06 | Verificação da Sprint 24 | `calculadora-fi/` | `npm run lint && npm run format:check && npm run test && npm run build` passam sem erros |

### Entregas
- App Shell, Header `.glass-panel`, Hero `SimulacaoCard` e Footer `rounded-3xl` alinhados ao `design-system.html`

### Dependências
- Sprint 23 (tokens CSS, fontes e animações disponíveis)

---

## Sprint 25 — Redesign do Formulário, Inputs, Atalhos e Preview do Principal

**Objetivo:** Aplicar a derivação fiel de tokens de formulário (PRD §30.3) em `InputField`, `AtalhosEntrada`, `AtalhosPrazo`, `PreviewPrincipal` e `FormCalculator`, preservando 100% dos atributos de acessibilidade e contratos de teste (RDS-005, RDS-008, RDS-009).

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S25-01 | Redesenhar `InputField.tsx` com superfícies `neutral-50`/`stone-200` e foco `#c1ff72`/`stone-900` | `src/components/ui/InputField.tsx` | Label em `font-montserrat text-sm font-semibold text-stone-800`; badge em `bg-stone-100 text-stone-700 border border-stone-200`; input em `bg-neutral-50 border-stone-200 text-stone-900 rounded-xl hover:border-stone-300 hover:bg-white focus:bg-white focus:ring-2 focus:ring-[#c1ff72]/60 focus:border-stone-900`; preserva `inputMode`, `aria-invalid`, `aria-describedby` e estados de erro em `red-*` |
| S25-02 | Redesenhar pílulas de atalho (`DownPaymentShortcuts.tsx` e `TermShortcuts.tsx`) | `src/components/form/DownPaymentShortcuts.tsx`, `src/components/form/TermShortcuts.tsx` | Rótulo "Atalhos:" em `text-stone-400 font-montserrat`; botão ativo em `bg-stone-900 text-[#c1ff72] border border-stone-900`; inativo em `bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200 hover:text-stone-900`; desabilitado em `bg-stone-100 text-stone-400 cursor-not-allowed`; nomes dos botões (`20% (Mín.)`, `360m (30a)`, etc.) inalterados |
| S25-03 | Redesenhar `PrincipalPreview.tsx` no padrão *Pattern C — Stats* | `src/components/form/PrincipalPreview.tsx` | Card `rounded-2xl bg-neutral-50 border border-stone-200 px-5 py-4` com indicador `w-2.5 h-2.5 rounded-full bg-[#c1ff72] border border-lime-600`, rótulo em `font-montserrat text-stone-600` e valor em `text-lg sm:text-xl font-semibold tracking-tighter text-stone-900 tabular-nums` |
| S25-04 | Redesenhar botão "Calcular" e divisores em `FormCalculator.tsx` | `src/components/form/FormCalculator.tsx` | Divisor `border-stone-200/80`; botão `type="submit"` em formato pílula `rounded-full` com `bg-stone-900 text-[#c1ff72] hover:bg-stone-800 shadow-lg hover:shadow-[0_0_20px_rgba(193,255,114,0.25)]` quando `isValid` e `bg-stone-200 text-stone-400 cursor-not-allowed` quando `!isValid` |
| S25-05 | Verificação da Sprint 25 | `calculadora-fi/` | `npx vitest run src/components/form/__tests__/FormCalculator.test.tsx` PASS + `npm run lint && npm run format:check && npm run build` OK |

### Entregas
- Formulário completo redesenhado com tokens NectArr e todos os testes de formulário passando

### Dependências
- Sprint 23 (tokens CSS) e Sprint 24 (`SimulationCard`)

---

## Sprint 26 — Redesign de Resultados, Recomendação, WhatsApp e Gráficos

**Objetivo:** Redesenhar a experiência pós-cálculo (`FinancingComparison`, `RecommendationCard`, `WhatsAppShareButton`, `ResultHeader`, `ChartsGrid`, `LineChart` e `utils/chart.ts`) aplicando as superfícies Bento/Dark/Lime/Navy, o efeito `.spotlight-card` e a nova paleta gráfica SAC (`#65a30d`/Lime) vs Price (`#002f43`/Deep Navy) (RDS-003, RDS-004, RDS-006, RDS-009).

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S26-01 | Redesenhar `RecommendationCard.tsx` com superfície de destaque NectArr | `src/components/results/RecommendationCard.tsx` | Card `rounded-[32px] p-6 md:p-8 border transition-all` em `bg-stone-900 text-white border-stone-800` (com glow radial `#c1ff72` sutil e selo `bg-[#c1ff72] text-stone-900` quando SAC vence, ou `bg-[#002f43] text-white border-sky-900` quando Price vence); badge de percentual de economia em `bg-[#c1ff72] text-stone-900 border border-[#aae65f] rounded-full`; preserva todos os textos semânticos |
| S26-02 | Redesenhar `WhatsAppShareButton.tsx` como CTA pílula NectArr | `src/components/results/WhatsAppShareButton.tsx` | Botão `rounded-full px-6 py-3 font-semibold text-sm bg-[#c1ff72] hover:bg-[#b0f060] text-stone-900 shadow-lg hover:shadow-[0_0_20px_rgba(193,255,114,0.3)] transition-all`; preserva `href`, `target="_blank"` e `aria-label="Compartilhar resultados via WhatsApp"` |
| S26-03 | Redesenhar `ResultHeader.tsx` com `.spotlight-card`, KPIs *Pattern C* e barra de composição | `src/components/results/ResultHeader.tsx` | Card aplica `.spotlight-card` + `onMouseMove={handleSpotlightMouseMove}`; card destacado ("Mais econômico") recebe `border-stone-900 ring-1 ring-stone-900/10 shadow-md` e badge `bg-[#c1ff72] text-stone-900 border border-[#aae65f] rounded-full`; 4 células KPI em `bg-neutral-50 border-stone-200/80 rounded-2xl` com valores `tracking-tighter text-stone-900 tabular-nums`; barra de composição usa `bg-stone-900` (amortização) e `bg-[#c1ff72]` (SAC) / `bg-[#002f43]` (Price) |
| S26-04 | Atualizar paleta e tipografia do Chart.js em `utils/chart.ts` | `src/utils/chart.ts` | `COR_SAC = '#65a30d'`, `COR_SAC_BG = 'rgba(193, 255, 114, 0.22)'`, `COR_PRICE = '#002f43'`, `COR_PRICE_BG = 'rgba(0, 47, 67, 0.08)'`; `criarTooltipPadrao()` usa `backgroundColor: '#1c1917'` e fonte `'Geist, sans-serif'` |
| S26-05 | Redesenhar `ChartsGrid.tsx` e `LineChart.tsx` | `src/components/results/ChartsGrid.tsx`, `src/components/results/LineChart.tsx` | `ChartsGrid` exibe eyebrow `bg-stone-100 text-stone-900` + título `font-montserrat`; `LineChart` usa `.spotlight-card bg-white rounded-2xl border-stone-200`, indicadores de legenda `bg-[#c1ff72] border border-lime-600` (SAC) e `bg-[#002f43]` (Price), eixos com fonte `'Geist, sans-serif'`, ticks `#78716c` e grid `#f5f5f4` |
| S26-06 | Verificação da Sprint 26 | `calculadora-fi/` | `npm run lint && npm run format:check && npm run test && npm run build` passam sem erros |

### Entregas
- Recomendação, botão WhatsApp, cards de resumo SAC/Price com efeito spotlight e 4 gráficos Chart.js redesenhados

### Dependências
- Sprint 23 (`spotlight.ts` e tokens CSS)

---

## Sprint 27 — Redesign das Tabelas, Paginação, Exportação CSV e Conteúdo Educativo

**Objetivo:** Alinhar as tabelas de amortização, controles de abas, paginação, exportação CSV e guia educativo ao padrão `.ds-spec-table` e aos cards de produto/solução do `design-system.html` (RDS-003, RDS-007, RDS-008, RDS-009).

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S27-01 | Redesenhar `TableTabs.tsx` e `ExportCSVButton.tsx` | `src/components/results/TableTabs.tsx`, `src/components/results/ExportCSVButton.tsx` | Barra superior em `bg-neutral-50 p-3 rounded-2xl border border-stone-200`; `tablist` em `bg-stone-200/70 p-1 rounded-xl`; aba SAC ativa em `bg-stone-900 text-[#c1ff72] shadow-xs`, aba Price ativa em `bg-[#002f43] text-white shadow-xs`, inativas em `text-stone-600 hover:text-stone-900`; botão CSV em `bg-white text-stone-900 border-stone-200 hover:bg-stone-900 hover:text-[#c1ff72] hover:border-stone-900 rounded-xl` |
| S27-02 | Redesenhar `AmortizationTable.tsx` no padrão `.ds-spec-table` | `src/components/results/AmortizationTable.tsx` | Container `bg-white rounded-2xl border border-stone-200 overflow-hidden`; barra de título em `bg-neutral-50 border-b border-stone-200` com `font-montserrat`; `thead` com `bg-neutral-50 border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500 font-montserrat`; coluna `Parcela` destacada em `bg-stone-100/80 text-stone-900 font-bold`; linhas com `divide-y divide-stone-200/70 even:bg-neutral-50/40 hover:bg-[#c1ff72]/15` |
| S27-03 | Redesenhar `Pagination.tsx` | `src/components/ui/Pagination.tsx` | Rodapé `border-t border-stone-200 bg-neutral-50`; botões `border-stone-200 bg-white text-stone-800 hover:bg-stone-900 hover:text-[#c1ff72] hover:border-stone-900 rounded-xl disabled:opacity-40`; mantém `aria-label="Página anterior"`, `aria-label="Próxima página"` e texto `Página {paginaAtual} de {totalPaginas}` |
| S27-04 | Redesenhar `EducationalContent.tsx` e `EducationTabs.tsx` | `src/components/education/EducationalContent.tsx`, `src/components/education/EducationTabs.tsx` | Eyebrow `font-semibold text-xs tracking-widest uppercase mb-3 block text-stone-900 bg-stone-100 w-fit px-3 py-1.5 rounded` ("Guia de Decisão"); título `font-montserrat text-2xl sm:text-3xl font-medium text-stone-900 tracking-tight`; card `bg-white rounded-[32px] border border-stone-200 overflow-hidden`; abas seguindo o mesmo padrão visual de `TableTabs` |
| S27-05 | Redesenhar `SystemPanel.tsx` e `ComparisonTable.tsx` | `src/components/education/SystemPanel.tsx`, `src/components/education/ComparisonTable.tsx` | `SystemPanel`: badge SAC em `bg-[#c1ff72] text-stone-900 border border-[#aae65f]`, badge Price em `bg-[#002f43] text-white`, itens de lista em `bg-neutral-50 border-stone-200 rounded-xl` com check `bg-[#c1ff72] text-stone-900` (SAC) / `bg-sky-100 text-[#002f43]` (Price), bloco de fórmula em `bg-stone-900 text-white rounded-2xl border border-stone-800` com label `text-[#c1ff72] font-mono text-xs uppercase tracking-wider`; `ComparisonTable` no estilo `.ds-spec-table` (`border-stone-200 bg-neutral-50 rounded-2xl`) |
| S27-06 | Verificação da Sprint 27 | `calculadora-fi/` | `npx vitest run src/components/results/__tests__/AmortizationTable.test.tsx` PASS + `npm run lint && npm run format:check && npm run test && npm run build` OK |

### Entregas
- Tabelas de amortização, paginação, botão CSV e guia educativo completo redesenhados

### Dependências
- Sprints 23 e 26

---

## Sprint 28 — Identidade Estática (`favicon`, `og-image`), Regressão, Screenshots e QA Final v1.6

**Objetivo:** Atualizar os assets gráficos estáticos, auditar a remoção completa da temática legada (`slate/blue/emerald`), validar os 123+ testes e o container Docker, e regenerar as capturas de tela oficiais do `README.md` (RDS-002, RDS-008, RDS-010).

### Tarefas

| ID | Tarefa | Onde | Critério de Aceite |
|----|--------|------|-------------------|
| S28-01 | Atualizar `favicon.svg` e `og-image.svg` para a identidade NectArr | `calculadora-fi/public/favicon.svg`, `calculadora-fi/public/og-image.svg` | SVGs utilizam fundo `#1c1917` (`stone-900`), acentos `#c1ff72` (Brand Lime) e `#002f43` (Deep Navy) e tipografia/geometria alinhadas ao redesign |
| S28-02 | Auditar ausência de classes cromáticas legadas nos componentes | `calculadora-fi/src/` | Busca com `rg '(slate|emerald|blue)-' src/` retorna zero ocorrências residuais (exceto se documentado explicitamente) |
| S28-03 | Executar suíte completa de qualidade local e em Docker | `calculadora-fi/`, raiz | `npm run lint`, `npm run format:check`, `npm run test` (123/123 PASS), `npm run build` (`dist/ < 500KB`) e `docker compose --profile test run --rm --build test` passam com exit code `0` |
| S28-04 | Recapturar screenshots oficiais e atualizar documentação | `docs/screenshots/*.png`, `README.md`, `calculadora-fi/README.md`, `AGENTS.md`, `PRD.md`, `SPRINTS.md` | 6 imagens em `docs/screenshots/` (`01-form-inicial.png`, `02-resultado-comparacao.png`, `02a-cards-comparacao.png`, `03-graficos.png`, `04-tabela.png`, `05-educativo.png`) recapturadas com a nova interface; `README.md` atualizado |

### Entregas
- Redesign v1.6 100% concluído, testado, empacotado em Docker e documentado com novos screenshots

### Dependências
- Sprints 23–27 concluídas

---

## Definição de Pronto (DoD)

Cada Sprint só será considerada completa quando:

- [x] Código implementado e commitado (Sprints 1–18 concluídas em 22/10/2026)
- [x] Testes unitários passando — 123/123 Vitest (10 arquivos) em 22/10/2026
- [x] Build de produção sem erros — `tsc -b && vite build` OK, `dist/` ~460KB em 22/10/2026
- [x] Responsividade validada — mobile-first, validado em 390px em 22/10/2026 (faixa total 320–2560 não medida formalmente)
- [ ] Cross-browser testado (últimas 2 versões)
- [ ] Code review realizado
- [x] Documentação atualizada — PRD v1.3 + v1.4, SPRINTS (Sprints 1–18), README com screenshots em 22/10/2026
- [x] Dockerização v1.5 — PRD §29 + SPRINTS 19–22 implementados e validados em 22/10/2026 (`app` healthy non-root na porta 8080, `dev` com HMR na porta 5173, `test` com 123/123 testes passando)
- [ ] Redesign NectArr Design System v1.6 — PRD §30 + SPRINTS 23–28 (planejado em 31/10/2026)

> DoD específico das Sprints 13–18 (refatoração segura — **concluído**): sem mudança visual/funcional (RFR-001); `npx vitest run` PASS (123 testes / 10 arquivos); `rg 'replace\(/\\./g'` sem ocorrências fora de `format.ts`; `tsc -b && vite build` OK; `npm run lint` zero errors e `format:check` OK.

> DoD específico das Sprints 19–22 (Dockerização v1.5 — **concluído**):
> 1. `docker compose --profile test run --rm --build test` passa `lint`, `format:check` e `test` (123 testes);
> 2. `docker compose up -d --build app` inicia sem `root` na porta `${PORT:-8080}`, atinge status `healthy` e serve `index.html` + chunks lazy (`results`, `education`) com `gzip` e headers de cache/segurança;
> 3. `docker compose --profile dev up -d --build dev` serve Vite com HMR em `http://localhost:5173`;
> 4. `README.md`, `calculadora-fi/README.md` e `AGENTS.md` documentam os comandos Docker.

> DoD específico das Sprints 23–28 (Redesign v1.6 — NectArr Design System):
> 1. Fontes `Geist` + `Montserrat` e utilitários `.glass-panel`, `.grid-lines`, `.spotlight-card`, `.glass-button` e animações ativos em `index.html` / `src/index.css`;
> 2. Zero classes residuais `slate-*`, `blue-*` ou `emerald-*` em `src/` (`rg '(slate|emerald|blue)-' src/`);
> 3. Identidade semântica **SAC = Brand Lime (`#c1ff72` / `#65a30d`)** e **Price = Deep Navy (`#002f43` / `sky-*`)** consistente em cards, gráficos, abas, tabelas e conteúdo educativo;
> 4. Todos os 123+ testes Vitest, OxLint, Prettier (`format:check`) e `npm run build` (`dist/ < 500KB`) passando localmente e no container `test`;
> 5. `public/favicon.svg`, `public/og-image.svg` e screenshots em `docs/screenshots/*.png` atualizados.

---

## Fluxo de Trabalho por Sprint

```
┌─────────────────────────────────────────────────────┐
│                    SPRINT                           │
├─────────────────────────────────────────────────────┤
│  1. Planejamento (30 min)                           │
│     └── Revisar tarefas e dependências              │
│                                                     │
│  2. Implementação (1-2 dias)                        │
│     └── Seguir ordem das tarefas                    │
│                                                     │
│  3. Testes (meio dia)                               │
│     └── Unitários + manuais                         │
│                                                     │
│  4. Revisão (30 min)                                │
│     └── Code review + ajustes                       │
│                                                     │
│  5. Entrega                                         │
│     └── Deploy preview + documentação               │
└─────────────────────────────────────────────────────┘
```

---

## Ordens de Dependência

```
Sprint 1 (Setup)
    │
    ▼
Sprint 2 (Formulário)
    │
    ▼
Sprint 3 (Cálculos)
    │
    ├──────────────────┐
    ▼                  ▼
Sprint 4 (Tabelas)   Sprint 7 (Educativo)
    │                  │
    ├─── Sprint 9 (Paginação)
    │
    ├─── Sprint 11 (CSV)
    │
    ▼                  │
Sprint 5 (Comparação)─┘
    │
    ▼
Sprint 6 (Gráficos)
    │
    └─── Sprint 10 (Gráficos Adicionais)
    │
    ▼
Sprint 8 (Polish)
    │
    ▼
Sprint 12 (Refinos)
    │
    ▼
Sprint 13 (Trava) → 14 (analise) → 15 (parsing) → 16 (validacao) → 17 (componentes) → 18 (higiene)
    │
    ▼
Sprint 19 (.dockerignore + nginx.conf) → 20 (Dockerfile Multi-Stage) → 21 (Docker Compose) → 22 (Validação E2E + Docs)
    │
    ▼
Sprint 23 (Fundação DS: Fontes + index.css + spotlight)
    │
    ▼
Sprint 24 (App Shell: Header .glass-panel + Hero SimulacaoCard + Footer)
    │
    ▼
Sprint 25 (Formulário: InputField + Atalhos + Preview + CTA Calcular)
    │
    ▼
Sprint 26 (Resultados + Gráficos: RecommendationCard + ResultHeader + Chart.js)
    │
    ▼
Sprint 27 (Tabelas + Educativo: .ds-spec-table + Paginação + CSV + Guia)
    │
    ▼
Sprint 28 (Assets SVG + Auditoria Cromática + 123 Testes + Screenshots)
```

---

## Estimativas de Duração

| Sprint | Duração Estimada | Complexidade |
|--------|------------------|--------------|
| Sprint 1 | 1 dia | Baixa |
| Sprint 2 | 1-2 dias | Média |
| Sprint 3 | 2 dias | Alta |
| Sprint 4 | 1-2 dias | Média |
| Sprint 5 | 1 dia | Média |
| Sprint 6 | 1-2 dias | Média |
| Sprint 7 | 1 dia | Baixa |
| Sprint 8 | 1-2 dias | Média |
| Sprint 9 | 1 dia | Média |
| Sprint 10 | 2 dias | Média-Alta |
| Sprint 11 | 1-2 dias | Média |
| Sprint 12 | — (não estimado, executado ad-hoc) | Baixa-Média |
| Sprint 13 | 0,5 dia | Baixa |
| Sprint 14 | 1 dia | Média |
| Sprint 15 | 0,5-1 dia | Média |
| Sprint 16 | 1 dia | Média |
| Sprint 17 | 1-2 dias | Média-Alta |
| Sprint 18 | 1 dia | Baixa-Média |
| Sprint 19 | 0,5 dia | Baixa |
| Sprint 20 | 0,5-1 dia | Média |
| Sprint 21 | 0,5 dia | Baixa-Média |
| Sprint 22 | 0,5 dia | Baixa |
| Sprint 23 | 0,5 dia | Baixa-Média |
| Sprint 24 | 0,5-1 dia | Média |
| Sprint 25 | 0,5-1 dia | Média |
| Sprint 26 | 1 dia | Média-Alta |
| Sprint 27 | 1 dia | Média |
| Sprint 28 | 0,5 dia | Baixa-Média |

**Total Estimado:** 14-19 dias (Sprints 1-11) + 5-6,5 dias (Sprints 13–18, refatoração v1.4) + 2-2,5 dias (Sprints 19–22, Dockerização v1.5) + 4-5 dias (Sprints 23–28, Redesign NectArr v1.6)

---

## Critérios de Aceite Gerais (aplicam a todas as Sprints)

| ID | Critério |
|----|----------|
| CA-G01 | Código TypeScript sem erros de tipo |
| CA-G02 | ESLint/OxLint sem warnings/errors |
| CA-G03 | Build de produção funciona |
| CA-G04 | Responsivo em mobile (320px minimum) |
| CA-G05 | Acessibilidade básica (labels, contraste) |
| CA-G06 | Performance aceitável (< 100ms para cálculos) — **não medido em runtime em 22/10/2026; build levou 153ms** |

---

**Status em 31/10/2026:** Sprints 1–22 implementadas e validadas (123 testes passando em 10 arquivos, `dist/` ~460KB, Dockerização multi-stage + Docker Compose verificados E2E). Sprints 23–28 especificadas e prontas para implementação etapa por etapa do Redesign v1.6 (`design_system/design-system.html`).  
**Próximo passo:** Executar as Sprints 23 a 28 (Redesign v1.6), seguidas de (1) testes cross-browser e (2) PWA / INCC-TR / PDF-XLSX / ITBI.
