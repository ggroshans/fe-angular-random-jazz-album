import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiAlbumsUrl = 'http://localhost:7162/api/admin';

  constructor(private http: HttpClient) {}

  public createAlbumsFromArtistName(artistName: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiAlbumsUrl}/create-discography`, artistName, { headers });
  }
}
