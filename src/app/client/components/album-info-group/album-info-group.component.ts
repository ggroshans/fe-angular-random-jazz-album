import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Album } from 'src/app/client/models/Album';

@Component({
  selector: 'app-album-info-group',
  templateUrl: './album-info-group.component.html',
  styleUrls: ['./album-info-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AlbumInfoGroupComponent {
  @Input() album!: Album;
}
