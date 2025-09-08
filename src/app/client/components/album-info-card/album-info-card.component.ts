import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-album-info-card',
  templateUrl: './album-info-card.component.html',
  styleUrls: ['./album-info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AlbumInfoCardComponent {
  @Input() title = '';
  @Input() theme:
    | 'purple'
    | 'teal'
    | 'amber'
    | 'slate'
    | 'emerald'
    | 'rose'
    | 'cyan'
    | 'indigo'
    | 'sky'
    | 'lime'
    | 'pink'
    | 'red'
    | 'orange'
    | 'fuchsia'
    | 'yellow' = 'teal';
  @Input() headingId?: string;
  @Input() legendText?: string;
}
