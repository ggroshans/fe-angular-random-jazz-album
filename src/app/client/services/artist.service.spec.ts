import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ArtistService } from './artist.service';

describe('ArtistService (easy & short)', () => {
  let service: ArtistService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistService],
    });
    service = TestBed.inject(ArtistService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('gets artist by id with correct URL and method', () => {
    service.getArtistById(42).subscribe((res) => expect(res).toEqual({ id: 42 } as any));

    const req = http.expectOne((r) =>
      r.urlWithParams.endsWith('/api/artist/get-artist?artistId=42'),
    );
    expect(req.request.method).toBe('GET');
    req.flush({ id: 42 });
  });
});
