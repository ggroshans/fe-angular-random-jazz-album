import { describe, it, expect, vi } from 'vitest';
import { Subject } from 'rxjs';
import { AlbumDetailComponent } from './album-detail.component';
import { loadAlbumById, loadRandomAlbum } from 'src/app/client/state/album/album.actions';
import { setColors } from 'src/app/client/state/color/color.action';

const pmap = (v: string | null) => ({ get: (k: string) => (k === 'albumId' ? v : null) }) as any;

describe('AlbumDetailComponent', () => {
  it('loads by id and updates theme colors', async () => {
    const album$ = new Subject<any>(),
      route = { paramMap: new Subject<any>() } as any;
    const store = { dispatch: vi.fn(), select: vi.fn() } as any;
    const colors = { darkColorBase: 'rgb(1,2,3)', tertiaryColor: 'rgb(9,8,7)' } as any;
    const colorService = { getPaletteFromUrl: vi.fn().mockResolvedValue(colors) } as any;

    const c = new AlbumDetailComponent(store, route, colorService);
    (c as any).album$ = album$;
    c.ngOnInit();
    route.paramMap.next(pmap('42'));
    expect(store.dispatch).toHaveBeenCalledWith(loadAlbumById({ id: 42 }));

    album$.next({ id: 42, imageUrl: 'img.jpg' });
    await Promise.resolve();
    expect(colorService.getPaletteFromUrl).toHaveBeenCalledWith('img.jpg');
    expect(store.dispatch).toHaveBeenCalledWith(setColors(colors));
  });

  it('loads random when albumId missing/non-numeric & glow util works', () => {
    const album$ = new Subject<any>(),
      route = { paramMap: new Subject<any>() } as any;
    const store = { dispatch: vi.fn(), select: vi.fn() } as any;
    const c = new AlbumDetailComponent(store, route, { getPaletteFromUrl: vi.fn() } as any);
    (c as any).album$ = album$;
    c.ngOnInit();
    route.paramMap.next(pmap(null));
    expect(store.dispatch).toHaveBeenCalledWith(loadRandomAlbum());
    expect(c.getGlowShadow('rgb(12,34,56)')).toMatch(/rgba\(12, 34, 56, 0\.65\)/);
  });
});
