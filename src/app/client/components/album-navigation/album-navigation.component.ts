import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { loadRandomAlbum } from 'src/app/client/state/album/album.actions';
import {
  selectDarkColorBase,
  selectLightColorBase,
  selectTertiaryColor,
} from '../../state/color/color.selectors';

@Component({
  selector: 'app-album-navigation',
  templateUrl: './album-navigation.component.html',
  styleUrls: ['./album-navigation.component.scss'],
  standalone: false,
})
export class AlbumNavigationComponent {
  constructor(
    private router: Router,
    private store: Store,
  ) {}

  readonly vm$ = combineLatest({
    light: this.store.select(selectLightColorBase),
    dark: this.store.select(selectDarkColorBase),
    tertiary: this.store.select(selectTertiaryColor),
  });

  navigateToAlbums(): void {
    this.router.navigate(['/albums']);
  }

  loadRandomAlbum(): void {
    this.store.dispatch(loadRandomAlbum());
    this.router.navigate(['/']);
  }
}
