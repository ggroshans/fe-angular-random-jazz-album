import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, first, switchMap, tap } from 'rxjs';
import { loadAlbumById, loadRandomAlbum } from 'src/app/client/state/album/album.actions';
import {
  selectAlbum,
  selectAlbumError,
  selectAlbumLoading,
} from '../../state/album/album.selectors';
import { setColors } from 'src/app/client/state/color/color.action';
import { ColorExtractionService } from '../../services/color-extraction.service';
import { Album } from '../../models/Album';
import { selectTertiaryColor } from '../../state/color/color.selectors';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
  standalone: false,
})
export class AlbumDetailComponent implements OnInit {
  album$ = this.store.select(selectAlbum);
  albumLoading$ = this.store.select(selectAlbumLoading);
  albumError$ = this.store.select(selectAlbumError);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private colorService: ColorExtractionService,
  ) {}

  public tertiaryColor$ = this.store.select(selectTertiaryColor);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const albumId = params.get('albumId');
          if (albumId && !isNaN(Number(albumId))) {
            const id = Number(albumId);
            this.store.dispatch(loadAlbumById({ id }));
            return this.album$.pipe(filter((album) => album?.id === id));
          } else {
            this.store.dispatch(loadRandomAlbum());
            return this.album$.pipe(filter((album): album is Album => !!album));
          }
        }),
        tap((album) => {
          if (album?.imageUrl) {
            this.updateThemeColors(album.imageUrl);
            console.log('album: ', album);
          }
        }),
      )
      .subscribe();
  }

  private updateThemeColors(imageUrl: string): void {
    this.colorService
      .getPaletteFromUrl(imageUrl)
      .then((colors) => {
        this.store.dispatch(setColors(colors));
        document.documentElement.style.setProperty('--dark-color-base', colors.darkColorBase);
        document.documentElement.style.setProperty('--tertiary-color', colors.tertiaryColor);
      })
      .catch((err) => console.error('Failed to extract colors', err));
  }

  public getGlowShadow(rgb: string): string {
    const match = rgb.match(/\d+/g);
    if (!match) return '';

    const [r, g, b] = match.map(Number);

    return `
    0 0 6px 1px rgba(${r}, ${g}, ${b}, 0.65),
    0 0 12px 4px rgba(${r}, ${g}, ${b}, 0.35),
    0 0 20px 10px rgba(${r}, ${g}, ${b}, 0.2)
  `;
  }
}
