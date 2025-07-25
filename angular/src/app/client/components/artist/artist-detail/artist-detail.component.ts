import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Artist } from '../../../models/Artist';
import { ActivatedRoute, Router } from '@angular/router';
import {
  selectArtist,
  selectArtistError,
  selectArtistLoading,
} from 'src/app/client/state/artist/artist.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ArtistState } from 'src/app/client/state/artist/artist.reducer';
import { loadArtist } from 'src/app/client/state/artist/artist.actions';
import { loadAlbumById } from 'src/app/client/state/album/album.actions';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ArtistDetailComponent implements OnInit {
  artist$ = this.store.select(selectArtist);
  artistLoading$ = this.store.select(selectArtistLoading);
  artistError$ = this.store.select(selectArtistError);
  biographyParagraphs: string[] = [];
  currentYear: number = new Date().getFullYear();

  public noteableAlbumCount: number = 4;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<ArtistState>,
  ) {}

  ngOnInit(): void {
    const artistId = +this.route.snapshot.paramMap.get('artistId')!;

    this.store.dispatch(loadArtist({ artistId }));

    this.artist$ = this.store.select(selectArtist);
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

  public getAlbumDetails(id: number) {
    this.store.dispatch(loadAlbumById({ id }));
    this.router.navigate(['album', id]);
  }
}
