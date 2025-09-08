import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/Album';
import { PaginatedResult } from '../models/PaginatedResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private baseUrl = `${environment.apiBaseUrl}/api/albums`;

  constructor(private http: HttpClient) {}

  getAlbums(
    query?: string | null,
    pageNumber: number = 1,
    pageSize: number = 12,
  ): Observable<PaginatedResult<Album>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (query) {
      params = params.set('query', query);
    }

    return this.http.get<PaginatedResult<Album>>(this.baseUrl, { params });
  }

  getRandomAlbum(): Observable<Album> {
    return this.http.get<Album>(this.baseUrl + '/random');
  }

  getAlbumById(id: number) {
    return this.http.get<Album>(`${this.baseUrl}/${id}`);
  }
}
