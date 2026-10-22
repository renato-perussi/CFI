/** Fonte única dos limites de negócio e das listas de sugestões da UI. */
export const ENTRADA_MINIMA = 0.2;
export const TAXA_MAXIMA = 20;
export const PRAZO_MAXIMO = 600;
export const ITENS_POR_PAGINA = 20;

export interface EntradaSugerida {
  percentual: number;
  rotulo: string;
}

export interface PrazoSugerido {
  meses: string;
  rotulo: string;
}

/** Atalhos de entrada (% do valor do imóvel). */
export const ENTRADAS_SUGERIDAS: EntradaSugerida[] = [
  { percentual: 20, rotulo: '20% (Mín.)' },
  { percentual: 30, rotulo: '30%' },
  { percentual: 40, rotulo: '40%' },
  { percentual: 50, rotulo: '50%' },
];

/** Atalhos de prazo (meses). */
export const PRAZOS_SUGERIDOS: PrazoSugerido[] = [
  { meses: '120', rotulo: '120m (10a)' },
  { meses: '240', rotulo: '240m (20a)' },
  { meses: '360', rotulo: '360m (30a)' },
  { meses: '420', rotulo: '420m (35a)' },
];
