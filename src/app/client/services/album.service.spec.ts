import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AlbumService } from './album.service';

describe('AlbumService (easy & short)', () => {
  let service: AlbumService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService],
    });
    service = TestBed.inject(AlbumService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('lists albums with paging (adds query when provided)', () => {
    service.getAlbums(null, 1, 12).subscribe();
    let req = http.expectOne((r) => r.url.endsWith('/api/albums'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('pageNumber')).toBe('1');
    expect(req.request.params.get('pageSize')).toBe('12');
    expect(req.request.params.has('query')).toBe(false);
    req.flush({ items: [], pageNumber: 1, totalPages: 0, totalCount: 0 });

    service.getAlbums('miles', 2, 24).subscribe();
    req = http.expectOne((r) => r.url.endsWith('/api/albums'));
    expect(req.request.params.get('query')).toBe('miles');
    expect(req.request.params.get('pageNumber')).toBe('2');
    expect(req.request.params.get('pageSize')).toBe('24');
    req.flush({ items: [], pageNumber: 2, totalPages: 0, totalCount: 0 });
  });

  it('gets a random album', () => {
    service.getRandomAlbum().subscribe();
    const req = http.expectOne((r) => r.url.endsWith('/api/albums/random'));
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('gets an album by id', () => {
    service.getAlbumById(42).subscribe();
    const req = http.expectOne((r) => r.url.endsWith('/api/albums/42'));
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
