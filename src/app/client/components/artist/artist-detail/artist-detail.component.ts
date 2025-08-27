import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDetailComponent {
  constructor(private location: Location) {}

  /**
   * Navigates to the previous page in the browser's history.
   */
  goBack(): void {
    this.location.back();
  }
}
