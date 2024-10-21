import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlbumForm } from '../models/admin.types';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiBaseUrl = 'http:localhost:7162/';

  constructor(private http: HttpClient) { }

  public createPost(data: AlbumForm) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiBaseUrl}`, data, { headers });
  }
}
