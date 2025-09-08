import { Component, Input } from '@angular/core';
import { Album } from '../../models/Album';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss',
  standalone: false,
})
export class AlbumCardComponent {
  @Input() album!: Album;
  @Input() isFlipped: boolean = false;

  constructor(private router: Router) {}

  get artistNames(): string {
    if (!this.album?.artists || this.album.artists.length === 0) {
      return 'Unknown Artist';
    }
    return this.album.artists.map((a) => a.name).join(', ');
  }

  navigateToAlbum(): void {
    if (!this.album) return;

    const id = this.album.id;

    if (id != null) {
      this.router.navigate(['/album', id]);
    } else {
      console.warn('Album id not found on album:', this.album);
    }
  }

  onSpaceNavigate(event: KeyboardEvent): void {
    event.preventDefault();
    this.navigateToAlbum();
  }
}
