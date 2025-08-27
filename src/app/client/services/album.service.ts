import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/Album';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private baseUrl = 'http://localhost:5148/api/album/';

  constructor(private http: HttpClient) {}

  getRandomAlbum(): Observable<Album> {
    return this.http.get<Album>(this.baseUrl + 'random');
  }

  getAlbumById(id: number) {
    return this.http.get<Album>(this.baseUrl + id);
  }
}
