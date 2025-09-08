import { describe, it, expect, vi } from 'vitest';
import { of } from 'rxjs';
import { AlbumHeroComponent } from './album-hero.component';
import { selectTertiaryColor, selectDarkColorBase } from '../../state/color/color.selectors';

describe('AlbumHeroComponent (easy)', () => {
  it('calls store selectors and exposes streams', async () => {
    const store = { select: vi.fn().mockReturnValue(of('color')) } as any;
    const comp = new AlbumHeroComponent(store);

    expect(store.select).toHaveBeenCalledWith(selectTertiaryColor);
    expect(store.select).toHaveBeenCalledWith(selectDarkColorBase);
    expect(await comp.tertiaryColor$.toPromise()).toBe('color');
  });

  it('getArtistString works with artists and additional', () => {
    const comp = new AlbumHeroComponent({ select: vi.fn() } as any);
    expect(comp.getArtistString([], '')).toBe('');
    expect(comp.getArtistString([{ name: 'Coltrane' }] as any, '')).toBe('Coltrane');
    expect(comp.getArtistString([{ name: 'Miles' }] as any, 'feat. Coltrane')).toBe(
      'Miles, feat. Coltrane',
    );
  });
});
