import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Artist } from 'src/app/client/models/Artist';

@Component({
  selector: 'app-artist-info-card',
  templateUrl: './artist-info-card.component.html',
  styleUrls: ['./artist-info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ArtistInfoCardComponent {
  @Input() artist!: Artist;
}
