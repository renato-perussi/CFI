# Sprints — Calculadora de Financiamento Imobiliário

**Projeto:** Calculadora de Financiamento Imobiliário  
**Base:** PRD v1.3 (implementado e validado em 22/10/2026)  
**Metodologia:** Sprints iterativas com entregas incrementais  
**Stack Frontend:** React 19 + TypeScript ~6.0 + Tailwind CSS 4.3 + Vite 8.1 (Chart.js 4.5, Vitest 5.0, OxLint 1.71)  
**Status em 22/10/2026:** Sprints 1-11 implementadas (53 testes passando, build limpo, `dist/` 464KB). Git: 1 commit + 31 arquivos modificados não commitados — pendente commit por escopo.

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
| S12-01 | Ponto de equilíbrio SAC vs Price | `ComparacaoFinanciamento.tsx` (`mesCruzamento`) | Exibe "a partir do NNNº mês" |
| S12-02 | Percentual de economia | `ComparacaoFinanciamento.tsx` (`percentualEconomia`) | Exibe `-X,X%` |
| S12-03 | Taxa anual equivalente | `FormCalculator.tsx` | Exibe `≈ X,XX% a.a.` |
| S12-04 | Atalhos entrada/prazo | `FormCalculator.tsx` | Botões preenchem campo |
| S12-05 | Preview valor financiado | `FormCalculator.tsx` | Exibe principal + % antes de calcular |
| S12-06 | Donut composição amortização/juros | `ResultadoHeader.tsx` | Texto/gráfico por sistema |
| S12-07 | Lazy loading + FadeIn | `App.tsx`, `ui/FadeIn.tsx` | `lazy`+`Suspense` em Comparação/Educativo |

### Entregas
- 7 refinamentos funcionais em produção local
- Pendente: testes unitários dedicados (S12-01 a S12-07) e commit por escopo

### Dependências
- Sprints 2, 5, 6, 8

---

## Definição de Pronto (DoD)

Cada Sprint só será considerada completa quando:

- [x] Código implementado (22/10/2026 — porém **não commitado**: 31 modificados + 5 untracked)
- [x] Testes unitários passando — 53/53 Vitest em 22/10/2026
- [x] Build de produção sem erros — `tsc -b && vite build` OK, `dist/` 464KB em 22/10/2026
- [x] Responsividade validada — mobile-first, validado em 390px em 22/10/2026 (faixa total 320–2560 não medida formalmente)
- [ ] Cross-browser testado (últimas 2 versões)
- [ ] Code review realizado
- [x] Documentação atualizada — PRD v1.3, SPRINTS (Sprint 12), README com screenshots em 22/10/2026

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

**Total Estimado:** 14-19 dias de desenvolvimento (Sprints 1-11; Sprint 12 fora do plano original)

---

## Critérios de Aceite Gerais (aplicam a todas as Sprints)

| ID | Critério |
|----|----------|
| CA-G01 | Código TypeScript sem erros de tipo |
| CA-G02 | ESLint sem warnings/errors |
| CA-G03 | Build de produção funciona |
| CA-G04 | Responsivo em mobile (320px minimum) |
| CA-G05 | Acessibilidade básica (labels, contraste) |
| CA-G06 | Performance aceitável (< 100ms para cálculos) — **não medido em runtime em 22/10/2026; build levou 153ms** |

---

**Status em 22/10/2026:** Sprints 1-11 implementadas + Sprint 12 (refinos) implementada; pendente commit por escopo, cross-browser formal e code review.  
**Próximo passo:** (1) commitar por escopo, (2) testes cross-browser, (3) PWA / INCC-TR / PDF-XLSX / ITBI (alinhado ao Roadmap do README).
