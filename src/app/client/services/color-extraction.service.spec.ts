import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ColorExtractionService } from './color-extraction.service';

vi.mock('colorthief', () => ({
  default: vi.fn().mockImplementation(() => ({
    getPalette: () => [
      [120, 120, 120],
      [10, 20, 30],
      [240, 230, 220],
    ],
  })),
}));

beforeEach(() => {
  global.Image = class {
    onload?: () => void;
    onerror?: (e: any) => void;
    set crossOrigin(_: string) {}
    set src(v: string) {
      Promise.resolve().then(() => (v.includes('bad') ? this.onerror?.('err') : this.onload?.()));
    }
  } as any;
});

describe('ColorExtractionService', () => {
  it('maps palette to dark/light/tertiary', async () => {
    const svc = new ColorExtractionService();
    const res = await svc.getPaletteFromUrl('ok.jpg');
    expect(res.darkColorBase).toBe('rgb(10, 20, 30)');
    expect(res.tertiaryColor).toBe('rgb(120, 120, 120)');
    expect(res.lightColorBase).toBe('rgb(240, 230, 220)');
  });

  it('rejects on image load error', async () => {
    const svc = new ColorExtractionService();
    await expect(svc.getPaletteFromUrl('bad.jpg')).rejects.toBe('Image load error');
  });
});
