import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/Artist';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private apiUrl = 'http://localhost:5148/api/artist/get-artist';

  constructor(private http: HttpClient) {}

  getArtistById(artistId: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}?artistId=${artistId}`);
  }
}
