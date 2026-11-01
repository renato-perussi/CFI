import type { MouseEvent } from 'react';

/**
 * Atualiza as variáveis CSS `--mouse-x` / `--mouse-y` do card sob o cursor,
 * alimentando o gradiente radial de `.spotlight-card::before`.
 * Não dispara re-render: escreve direto no style do `currentTarget`.
 */
export function handleSpotlightMouseMove(event: MouseEvent<HTMLElement>): void {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  event.currentTarget.style.setProperty('--mouse-x', `${x}px`);
  event.currentTarget.style.setProperty('--mouse-y', `${y}px`);
}
