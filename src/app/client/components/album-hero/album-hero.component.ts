import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Album } from 'src/app/client/models/Album'; // Use your model
import { Artist } from '../../models/Artist';

@Component({
  selector: 'app-album-hero',
  templateUrl: './album-hero.component.html',
  styleUrls: ['./album-hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AlbumHeroComponent {
  @Input() album!: Album;

  public getArtistString(artists: Artist[], additionalArtists: string) {
    if (artists.length == 0 || artists == null) {
      return '';
    }
    if (additionalArtists != null && additionalArtists.length > 0) {
      return artists[0].name + `, ${additionalArtists}`;
    }
    return artists[0].name;
  }
}
