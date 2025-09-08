import { describe, it, expect, vi } from 'vitest';
import { AlbumCardComponent } from './album-card.component';

describe('AlbumCardComponent (simple)', () => {
  const router = { navigate: vi.fn() };
  let comp: AlbumCardComponent;

  beforeEach(() => {
    comp = new AlbumCardComponent(router as any);
    router.navigate.mockClear();
  });

  it('shows "Unknown Artist" if there are no artists', () => {
    comp.album = { id: 1, artists: [] } as any;
    expect(comp.artistNames).toBe('Unknown Artist');
  });

  it('lists artist names separated by commas', () => {
    comp.album = {
      id: 1,
      artists: [{ name: 'Coltrane' }, { name: 'Davis' }],
    } as any;
    expect(comp.artistNames).toBe('Coltrane, Davis');
  });

  it('navigates to the album page when album has an id', () => {
    comp.album = { id: 42, artists: [] } as any;
    comp.navigateToAlbum();
    expect(router.navigate).toHaveBeenCalledWith(['/album', 42]);
  });

  it('prevents default and navigates when space key pressed', () => {
    comp.album = { id: 99, artists: [] } as any;
    const event = { preventDefault: vi.fn() } as any;

    comp.onSpaceNavigate(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/album', 99]);
  });
});
