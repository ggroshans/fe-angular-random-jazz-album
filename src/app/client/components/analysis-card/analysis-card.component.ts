import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-analysis-card',
  templateUrl: './analysis-card.component.html',
  styleUrls: ['./analysis-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AnalysisCardComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() score: number | null | undefined = 0;
  @Input() description!: string;
  @Input() theme: 'blue' | 'red' | 'yellow' = 'blue';
}
