import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/Artist';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private baseUrl = `${environment.apiBaseUrl}/api/artist/get-artist`;

  constructor(private http: HttpClient) {}

  getArtistById(artistId: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.baseUrl}?artistId=${artistId}`);
  }
}
