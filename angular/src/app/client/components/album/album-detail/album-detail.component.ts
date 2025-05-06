import { Component, OnInit, } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, first, map, Observable, switchMap, tap } from 'rxjs';
import { selectAlbum, selectAlbumError, selectAlbumLoading } from '../../../state/album/album.selectors';
import { Mood } from 'src/app/client/models/Mood';
import { Subgenre } from 'src/app/client/models/Subgenre';
import { Artist } from 'src/app/client/models/Artist';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { loadAlbumById, loadRandomAlbum } from 'src/app/client/state/album/album.actions';
import ColorThief from 'colorthief';
import { setColors } from 'src/app/client/state/color/color.action';
import { selectMainColor, selectSecondaryColor } from 'src/app/client/state/color/color.selectors';
import { LoadingService } from 'src/app/client/services/loading.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
  standalone: false,
})
export class AlbumDetailComponent implements OnInit {

  album$ = this.store.select(selectAlbum);
  albumLoading$ = this.store.select(selectAlbumLoading);
  albumError$ = this.store.select(selectAlbumError);

  currentYear = new Date().getFullYear();

  mainColor$: Observable<string> = this.store.select(selectMainColor);
  secondaryColor$: Observable<string> = this.store.select(selectSecondaryColor);

  constructor(private store: Store, private router: Router, private route: ActivatedRoute, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.SetLoading(true);

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let routeParam = params.get("albumId");
        if (routeParam) {
          let id = Number(routeParam);
          if (!Number.isNaN(id)) {
            this.store.dispatch(loadAlbumById({ id }))
            return this.album$.pipe(
              filter((album) => album !== null && album.id == id),
              first(),
              tap((album) => {
                if (album?.imageUrl) {
                  this.computeDominantImgColor(album.imageUrl);
                }
              })
            )
          }
        }
        this.store.dispatch(loadRandomAlbum());

        return combineLatest([
          this.album$,
          this.store.select(selectAlbumLoading),
        ]).pipe(
          filter(([album, loading]) => !loading && !!album),
          first(),
          tap(([album]) => {
            if (album?.imageUrl) {
              this.computeDominantImgColor(album.imageUrl);
            }
          })
        )
      })
    ).subscribe(() => this.loadingService.SetLoading(false))

    combineLatest([
      this.store.select(selectMainColor),
      this.store.select(selectSecondaryColor)
    ]).subscribe(([mainColor, secondaryColor]) => {
      document.documentElement.style.setProperty("--computed-main-color", mainColor);
      document.documentElement.style.setProperty("--computed-secondary-color", secondaryColor);
    })
  }

  public getArtistString(artists: Artist[]) {
    if (artists.length == 0 || artists == null) {
      return "";
    }
    return artists.map((a) => a.name).join(", ");
  }

  public getSubgenreString(subgenres: Subgenre[]) {
    if (subgenres.length == 0 || subgenres == null) {
      return "";
    }
    return subgenres.map((s) => s.name).join(", ");
  }

  public getMoodString(moods: Mood[]) {
    if (moods.length == 0 || moods == null) {
      return "";
    }
    return moods.map((m) => m.name).join(", ");
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
        return "";
    }
  }

  public getProgressBarColor(percentileScore: number): string {
    if (percentileScore > 75) {
      return "progress-bar-green";
    } else if (percentileScore > 60) {
      return "progress-bar-yellowgreen";
    } else if (percentileScore > 45) {
      return "progress-bar-yellow";
    } else if (percentileScore > 25) {
      return "progress-bar-orange";
    } else {
      return "progress-bar-red";
    }
  }

  public goToArtistDetail(artistId: Number) {
    this.router.navigate(['artist', artistId])
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

          const dominantColor = colorThief.getColor(image); // [r, g, b]
          const complementColor = dominantColor.map((c: number) => 255 - c); // direct complement

          const dominantBrightness = dominantColor.reduce((sum: number, val: number) => sum + val, 0);
          const complementBrightness = complementColor.reduce((sum: number, val: number) => sum + val, 0);

          const dominantColorString = `rgb(${dominantColor.join(', ')})`;
          const complementColorString = `rgb(${complementColor.join(', ')})`;

          if (dominantBrightness > complementBrightness) { // higher val is darker, lower val is  lighter
            this.store.dispatch(setColors({ mainColor: complementColorString, secondaryColor: dominantColorString }));
          } else {
            this.store.dispatch(setColors({ mainColor: dominantColorString, secondaryColor: complementColorString }));
          }
          resolve();
        } else {
          console.error('Image failed to load or CORS issue');
          reject();
        }
      };
      image.onerror = () => {
        console.error('Failed to load image from URL');
        reject();
      };
    })
  }
}
