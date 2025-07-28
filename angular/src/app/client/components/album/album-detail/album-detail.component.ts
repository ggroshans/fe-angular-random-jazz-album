import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, first, switchMap, tap } from 'rxjs';
import {
  selectAlbum,
  selectAlbumError,
  selectAlbumLoading,
} from '../../../state/album/album.selectors';
import { Mood } from 'src/app/client/models/Mood';
import { Subgenre } from 'src/app/client/models/Subgenre';
import { Artist } from 'src/app/client/models/Artist';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { loadAlbumById, loadRandomAlbum } from 'src/app/client/state/album/album.actions';
import ColorThief from 'colorthief';
import { setColors } from 'src/app/client/state/color/color.action';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  selectDarkColorBase,
  selectLightColorBase,
  selectTertiaryColor,
} from 'src/app/client/state/color/color.selectors';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
  standalone: false,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AlbumDetailComponent implements OnInit {
  album$ = this.store.select(selectAlbum);
  albumLoading$ = this.store.select(selectAlbumLoading);
  albumError$ = this.store.select(selectAlbumError);

  currentYear = new Date().getFullYear();

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let routeParam = params.get('albumId');
          if (routeParam) {
            let id = Number(routeParam);
            if (!Number.isNaN(id)) {
              this.store.dispatch(loadAlbumById({ id }));
              return this.album$.pipe(
                filter((album) => album !== null && album.id == id),
                first(),
                tap((album) => {
                  if (album?.imageUrl) {
                    this.computeDominantImgColor(album.imageUrl);
                  }
                }),
              );
            }
          }
          this.store.dispatch(loadRandomAlbum());

          return combineLatest([this.album$, this.store.select(selectAlbumLoading)]).pipe(
            filter(([album, loading]) => !loading && !!album),
            first(),
            tap(([album]) => {
              if (album?.imageUrl) {
                this.computeDominantImgColor(album.imageUrl);
                console.log('album data', album);
              }
            }),
          );
        }),
      )
      .subscribe();

    combineLatest([
      this.store.select(selectLightColorBase),
      this.store.select(selectDarkColorBase),
      this.store.select(selectTertiaryColor),
    ]).subscribe(([lightColorBase, darkColorBase, tertiaryColor]) => {
      document.documentElement.style.setProperty('--light-color-base', lightColorBase);
      document.documentElement.style.setProperty('--dark-color-base', darkColorBase);
      document.documentElement.style.setProperty('--tertiary-color', tertiaryColor);
    });
  }

  public getArtistString(artists: Artist[], additionalArtists: string) {
    if (artists.length == 0 || artists == null) {
      return '';
    }
    if (additionalArtists.length > 0) {
      return artists[0].name + `, ${additionalArtists}`;
    }
    return artists[0].name;
  }

  public getSubgenreString(subgenres: Subgenre[]) {
    if (subgenres.length == 0 || subgenres == null) {
      return '';
    }
    return subgenres.join(', ');
  }

  public getMoodString(moods: Mood[]) {
    if (moods.length == 0 || moods == null) {
      return '';
    }
    return moods.map((m) => m.name).join(', ');
  }

  public getPercentileString(percentileScore: number) {
    var lastDigit = percentileScore % 10;

    switch (lastDigit) {
      case 1:
        return `${percentileScore}st`;
      case 2:
        return `${percentileScore}nd`;
      case 3:
        return `${percentileScore}rd`;
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 0:
        return `${percentileScore}th`;
      default:
        return '';
    }
  }

  public getProgressBarColor(percentileScore: number): string {
    if (percentileScore > 75) {
      return 'progress-bar-green';
    } else if (percentileScore > 60) {
      return 'progress-bar-yellowgreen';
    } else if (percentileScore > 45) {
      return 'progress-bar-yellow';
    } else if (percentileScore > 25) {
      return 'progress-bar-orange';
    } else {
      return 'progress-bar-red';
    }
  }

  public getScoreColor(percentileScore: number): string {
    if (percentileScore > 75) {
      return 'text-green';
    } else if (percentileScore > 60) {
      return 'text-yellowgreen';
    } else if (percentileScore > 45) {
      return 'text-yellow';
    } else if (percentileScore > 25) {
      return 'text-orange';
    } else {
      return 'text-red';
    }
  }

  public goToArtistDetail(artistId: Number) {
    this.router.navigate(['artist', artistId]);
  }

  public computeDominantImgColor(imageUrl: string | undefined): Promise<void> {
    return new Promise((resolve, reject) => {
      if (imageUrl === undefined || imageUrl === '') {
        reject('Image is null');
      }

      const colorThief = new ColorThief();
      const image = new Image();

      image.src = imageUrl || '';
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        if (image.complete && image.naturalHeight !== 0) {
          const albumColors = colorThief.getPalette(image, 3); // [r, g, b]

          const dominantColor = albumColors[0];
          // const complementColor = dominantColor.map((c: number) => 255 - c); // direct complement
          const secondaryColor = albumColors[1];
          const tertiaryColor = albumColors[2];

          const dominantBrightness = dominantColor.reduce(
            (sum: number, val: number) => sum + val,
            0,
          );

          const secondDominantColorBrightness = secondaryColor.reduce(
            (sum: number, val: number) => sum + val,
            0,
          );

          const dominantColorString = `rgb(${dominantColor.join(', ')})`;
          const secondaryColorString = `rgb(${secondaryColor.join(', ')})`;
          const tertiaryColorString = `rgb(${tertiaryColor.join(', ')})`;

          if (dominantBrightness > secondaryColor) {
            // higher val is lighter, lower val is darker
            this.store.dispatch(
              setColors({
                lightColorBase: dominantColorString,
                darkColorBase: secondaryColorString,
                tertiaryColor: tertiaryColorString,
              }),
            );
          } else {
            this.store.dispatch(
              setColors({
                lightColorBase: secondaryColorString,
                darkColorBase: dominantColorString,
                tertiaryColor: tertiaryColorString,
              }),
            );
          }

          const luminance = resolve();
        } else {
          console.error('Image failed to load or CORS issue');
          reject();
        }
      };
      image.onerror = () => {
        console.error('Failed to load image from URL');
        reject();
      };
    });
  }

  public isOriginalReleaseResponse(isOriginalRelease: boolean): string {
    return isOriginalRelease == true ? 'Yes' : 'No';
  }
}
