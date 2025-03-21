import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/Album';

@Injectable({
  providedIn: 'root',
})

export class AlbumService {
  private apiUrl = 'http://localhost:5148/api/album/random-album';

  constructor(private http: HttpClient) { }

  getRandomAlbum(): Observable<Album> {
    return this.http.get<Album>(this.apiUrl)
  }
}




