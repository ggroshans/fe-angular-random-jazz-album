import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ScoreCardComponent {
  @Input() icon!: string;
  @Input() label!: string;
  @Input() score: number | null | undefined = 0;
  @Input() iconTheme: 'blue' | 'red' | 'yellow' = 'blue';

  private get scoreValue(): number {
    return this.score || 0;
  }

  public getScoreColor(): string {
    const score = this.scoreValue;
    if (score > 75) return 'text-green';
    if (score > 60) return 'text-yellowgreen';
    if (score > 45) return 'text-yellow';
    if (score > 25) return 'text-orange';
    return 'text-red';
  }

  public getProgressBarColor(): string {
    const score = this.scoreValue;
    if (score > 75) return 'progress-bar-green';
    if (score > 60) return 'progress-bar-yellowgreen';
    if (score > 45) return 'progress-bar-yellow';
    if (score > 25) return 'progress-bar-orange';
    return 'progress-bar-red';
  }
}
