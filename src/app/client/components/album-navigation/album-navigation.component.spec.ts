import { describe, it, expect, vi } from 'vitest';
import { AlbumNavigationComponent } from './album-navigation.component';
import { loadRandomAlbum } from 'src/app/client/state/album/album.actions';

describe('AlbumNavigationComponent', () => {
  const router = { navigate: vi.fn() } as any;
  const store = { dispatch: vi.fn(), select: vi.fn() } as any;
  const comp = new AlbumNavigationComponent(router, store);

  it('navigates to /albums', () => {
    comp.navigateToAlbums();
    expect(router.navigate).toHaveBeenCalledWith(['/albums']);
  });

  it('dispatches loadRandomAlbum and navigates home', () => {
    comp.loadRandomAlbum();
    expect(store.dispatch).toHaveBeenCalledWith(loadRandomAlbum());
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
