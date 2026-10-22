import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { downloadCSV } from '../csvDownload';

describe('downloadCSV', () => {
  let clickSpy: ReturnType<typeof vi.fn>;
  let appendChildSpy: ReturnType<typeof vi.fn>;
  let removeChildSpy: ReturnType<typeof vi.fn>;
  let revokeObjectURLSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    clickSpy = vi.fn();
    appendChildSpy = vi.fn();
    removeChildSpy = vi.fn();
    revokeObjectURLSpy = vi.fn();

    vi.spyOn(document, 'createElement').mockReturnValue({
      href: '',
      download: '',
      style: { display: '' },
      click: clickSpy,
    } as unknown as HTMLAnchorElement);

    vi.spyOn(document.body, 'appendChild').mockImplementation(
      appendChildSpy as (node: Node) => Node
    );
    vi.spyOn(document.body, 'removeChild').mockImplementation(
      removeChildSpy as (child: Node) => Node
    );
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(
      revokeObjectURLSpy as (url: string) => void
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve criar blob com charset UTF-8 e BOM', () => {
    downloadCSV('test', 'file.csv');

    expect(URL.createObjectURL).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'text/csv;charset=utf-8;' })
    );
  });

  it('deve adicionar link ao body e clicar', () => {
    downloadCSV('test', 'file.csv');

    expect(appendChildSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
  });

  it('deve configurar nome do arquivo', () => {
    downloadCSV('test', 'financiamento.csv');

    const link = vi.mocked(document.createElement).mock.results[0].value;
    expect(link.download).toBe('financiamento.csv');
  });

  it('deve revogar URL do objeto', () => {
    downloadCSV('test', 'file.csv');

    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');
  });

  it('deve propagar falha do createObjectURL sem tocar no DOM', () => {
    vi.mocked(URL.createObjectURL).mockImplementation(() => {
      throw new Error('blob indisponível');
    });

    expect(() => downloadCSV('test', 'file.csv')).toThrow('blob indisponível');
    expect(appendChildSpy).not.toHaveBeenCalled();
    expect(clickSpy).not.toHaveBeenCalled();
    expect(removeChildSpy).not.toHaveBeenCalled();
    expect(revokeObjectURLSpy).not.toHaveBeenCalled();
  });
});
