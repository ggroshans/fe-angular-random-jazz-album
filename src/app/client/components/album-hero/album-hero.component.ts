import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Album } from '../../models/Album';
import { Artist } from '../../models/Artist';
import {
  selectDarkColorBase,
  selectLightColorBase,
  selectTertiaryColor,
} from '../../state/color/color.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-album-hero',
  templateUrl: './album-hero.component.html',
  styleUrls: ['./album-hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AlbumHeroComponent {
  @Input() album!: Album;

  public tertiaryColor$ = this.store.select(selectTertiaryColor);
  public darkColor$ = this.store.select(selectDarkColorBase);

  public constructor(private store: Store) {}

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
