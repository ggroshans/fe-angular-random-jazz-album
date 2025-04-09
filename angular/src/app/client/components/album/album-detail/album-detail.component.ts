import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Album } from '../../../models/Album';
import { loadRandomAlbum } from '../../../state/album.actions';
import { selectAlbum, selectLoading, selectError } from '../../../state/album.selectors';
import { Mood } from 'src/app/client/models/Mood';
import { Subgenre } from 'src/app/client/models/Subgenre';
import { Artist } from 'src/app/client/models/Artist';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
  standalone: false,
})
export class AlbumDetailComponent {

  album$: Observable<Album | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  currentYear = new Date().getFullYear();

  constructor(private store: Store) {
    this.album$ = this.store.select(selectAlbum);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadRandomAlbum());

    this.album$.subscribe(album => {
      console.log("popular tracks", album?.popularTracks.toString());
    });
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

  public splitAlbumTitle(albumTitle: string) {
    return albumTitle.split(":");
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
}
