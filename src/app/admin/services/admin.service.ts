import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

type ApiMessage = { message?: string };
type EnrichmentResponse = { message: string; steps: string[]; completedUtc: string };

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = `${environment.apiBaseUrl}/api/admin`;
  private enrichmentUrl = `${environment.apiBaseUrl}/api/enrichment`;

  constructor(private http: HttpClient) {}

  private jsonHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public createAlbumsFromArtistName(artistName: string): Observable<ApiMessage> {
    const body = { artistName: (artistName ?? '').trim() };
    return this.http.post<ApiMessage>(`${this.baseUrl}/create-discography`, body, {
      headers: this.jsonHeaders(),
    });
  }

  public runBatchEnrichment(): Observable<EnrichmentResponse> {
    return this.http.post<EnrichmentResponse>(
      `${this.enrichmentUrl}/batch-process`,
      {},
      {
        headers: this.jsonHeaders(),
      },
    );
  }
}
