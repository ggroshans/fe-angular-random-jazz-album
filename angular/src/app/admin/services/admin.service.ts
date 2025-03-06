import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DiscoRequestDto } from '../models/admin.types';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private apiAlbumsUrl = 'http://localhost:7162/api/albums';

  constructor(private http: HttpClient) { }

  public createAlbumsFromArtistName(data: DiscoRequestDto) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiAlbumsUrl}/populate-from-artist`, data, { headers });
  }
}
