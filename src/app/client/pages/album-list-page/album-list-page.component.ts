import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Album } from '../../models/Album';
import { AlbumService } from '../../services/album.service';
import { PaginatedResult } from '../../models/PaginatedResponse';

@Component({
  selector: 'app-album-list-page',
  templateUrl: './album-list-page.component.html',
  styleUrl: './album-list-page.component.scss',
  standalone: false,
})
export class AlbumListPageComponent implements OnInit {
  searchQuery = '';
  private searchSubject = new Subject<string>();

  allFlipped = false;
  albums: Album[] = [];

  currentPage = 1;
  totalPages = 0;
  totalCount = 0;
  pageSize = 12;

  isLoading = true;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.fetchAlbums();

    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((query) => {
      this.currentPage = 1;
      this.fetchAlbums(query);
    });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }

  fetchAlbums(query: string | null = null): void {
    this.isLoading = true;
    this.albumService.getAlbums(query, this.currentPage, this.pageSize).subscribe({
      next: (result: PaginatedResult<Album>) => {
        this.albums = result.items;
        this.currentPage = result.pageNumber;
        this.totalPages = result.totalPages;
        this.totalCount = result.totalCount;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch albums', err);
        this.isLoading = false;
      },
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchAlbums(this.searchQuery || null);
    }
  }
}
