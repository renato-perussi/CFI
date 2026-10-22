/** Dispara o download de um CSV via Blob com BOM (Excel/Sheets). */
export function downloadCSV(conteudo: string, nomeArquivo: string): void {
  const blob = new Blob(['\uFEFF' + conteudo], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = nomeArquivo;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
