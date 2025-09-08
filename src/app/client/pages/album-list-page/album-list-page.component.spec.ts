import { describe, it, expect, vi } from 'vitest';
import { of } from 'rxjs';
import { AlbumListPageComponent } from './album-list-page.component';

const res = (items = [{}], page = 1, pages = 3, total = 42) => ({
  items,
  pageNumber: page,
  totalPages: pages,
  totalCount: total,
});

describe('AlbumListPageComponent', () => {
  it('fetches on init and debounced search resets to page 1', () => {
    vi.useFakeTimers();
    const svc = { getAlbums: vi.fn().mockReturnValue(of(res())) } as any;
    const c = new AlbumListPageComponent(svc);

    c.ngOnInit();
    expect(svc.getAlbums).toHaveBeenCalledWith(null, 1, 12);
    expect(c.albums.length).toBe(1);
    expect(c.isLoading).toBe(false);

    c.currentPage = 5;
    c.searchQuery = 'miles';
    c.onSearchChange();
    vi.advanceTimersByTime(300);
    expect(c.currentPage).toBe(1);
    expect(svc.getAlbums).toHaveBeenLastCalledWith('miles', 1, 12);
    vi.useRealTimers();
  });

  it('goToPage: in-range fetches, out-of-range ignored', () => {
    const svc = { getAlbums: vi.fn((q, p, s) => of(res([], p, 4, 0))) } as any;
    const c = new AlbumListPageComponent(svc);
    c.totalPages = 4;
    c.searchQuery = 'coltrane';

    c.goToPage(2);
    expect(c.currentPage).toBe(2);
    expect(svc.getAlbums).toHaveBeenLastCalledWith('coltrane', 2, 12);

    const calls = svc.getAlbums.mock.calls.length;
    c.goToPage(0);
    c.goToPage(5);
    expect(svc.getAlbums.mock.calls.length).toBe(calls);
  });
});
