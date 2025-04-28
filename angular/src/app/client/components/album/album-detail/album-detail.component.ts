import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Album } from '../../../models/Album';
import { selectAlbum, selectLoading, selectError } from '../../../state/album/album.selectors';
import { Mood } from 'src/app/client/models/Mood';
import { Subgenre } from 'src/app/client/models/Subgenre';
import { Artist } from 'src/app/client/models/Artist';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { loadAlbumById, loadRandomAlbum } from 'src/app/client/state/album/album.actions';
import ColorThief from 'colorthief';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
  standalone: false,
})
export class AlbumDetailComponent implements OnInit {

  album$: Observable<Album | null>;
  loading$: Observable<boolean>;
  loading = true;
  error$: Observable<string | null>;


  currentYear = new Date().getFullYear();

  mainColor: string = "blue";
  secondaryColor: string = "red";


  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {
    this.album$ = this.store.select(selectAlbum);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {

    let obj: {
      id: number
    } = { id: 0 };

    this.route.paramMap.subscribe((params: ParamMap) => {
      let routeParam = params.get("albumId");

      if (routeParam !== null && routeParam !== '') {
        let potentialId = Number(routeParam);
        if (!Number.isNaN(potentialId)) {
          obj.id = potentialId;
          this.store.dispatch(loadAlbumById(obj));
        }
      }

      else {
        this.store.dispatch(loadRandomAlbum());
      }
    });

    this.album$.subscribe(album => {
      this.computePrimaryColor(album?.imageUrl).then(() => {
        document.documentElement.style.setProperty("--computed-main-color", this.mainColor);
        document.documentElement.style.setProperty("--computed-secondary-color", this.secondaryColor);
      });
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

  public computePrimaryColor(imageUrl: string | undefined): Promise<void> {
    return new Promise((resolve, reject) => {

      if (imageUrl === undefined || imageUrl === '') {
        console.log("image url empty", imageUrl);
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

          if (dominantBrightness > complementBrightness) {
            this.mainColor = complementColorString;    // darker
            this.secondaryColor = dominantColorString; // lighter
          } else {
            this.mainColor = dominantColorString;
            this.secondaryColor = complementColorString;
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
