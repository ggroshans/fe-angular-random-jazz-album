import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AdminService } from './admin.service';
import { environment } from '../../../environments/environment';

type ApiMessage = { message?: string };
type EnrichmentResponse = { message: string; steps: string[]; completedUtc: string };

describe('AdminService', () => {
  let service: AdminService;
  let http: HttpTestingController;

  const baseUrl = `${environment.apiBaseUrl}/api/admin`;
  const enrichmentUrl = `${environment.apiBaseUrl}/api/enrichment`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService],
    });
    service = TestBed.inject(AdminService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('POSTs /create-discography with trimmed artistName and JSON header', () => {
    const artist = '  Miles Davis  ';
    const expectedBody = { artistName: 'Miles Davis' };
    const expectedResponse: ApiMessage = { message: 'queued' };

    service.createAlbumsFromArtistName(artist).subscribe((res) => {
      expect(res).toEqual(expectedResponse);
    });

    const req = http.expectOne(`${baseUrl}/create-discography`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(expectedBody);
    req.flush(expectedResponse);
  });

  it('POSTs /batch-process with empty body and JSON header, returns EnrichmentResponse', () => {
    const mock: EnrichmentResponse = {
      message: 'Batch complete',
      steps: ['normalize', 'calculate', 'enrich'],
      completedUtc: '2025-09-05T20:45:00Z',
    };

    service.runBatchEnrichment().subscribe((res) => {
      expect(res.message).toBe('Batch complete');
      expect(Array.isArray(res.steps)).toBe(true);
      expect(res.steps.length).toBeGreaterThan(0);
      expect(res.completedUtc).toMatch(/Z$/);
    });

    const req = http.expectOne(`${enrichmentUrl}/batch-process`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual({});
    req.flush(mock);
  });
});
