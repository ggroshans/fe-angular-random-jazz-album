import { describe, it, expect } from 'vitest';
import { ScoreCardComponent } from './score-card.component';

describe('ScoreCardComponent', () => {
  it('defaults & nullish score behave as 0 (red)', () => {
    const c = new ScoreCardComponent();
    expect(c.iconTheme).toBe('blue');
    expect(c.getScoreColor()).toBe('text-red');
    expect(c.getProgressBarColor()).toBe('progress-bar-red');

    c.score = null;
    expect(c.getScoreColor()).toBe('text-red');
    c.score = undefined;
    expect(c.getProgressBarColor()).toBe('progress-bar-red');
  });

  it('maps score thresholds to classes', () => {
    const c = new ScoreCardComponent();
    const cases: [number, string, string][] = [
      [25, 'text-red', 'progress-bar-red'],
      [26, 'text-orange', 'progress-bar-orange'],
      [46, 'text-yellow', 'progress-bar-yellow'],
      [61, 'text-yellowgreen', 'progress-bar-yellowgreen'],
      [76, 'text-green', 'progress-bar-green'],
    ];
    for (const [score, textCls, barCls] of cases) {
      c.score = score;
      expect(c.getScoreColor()).toBe(textCls);
      expect(c.getProgressBarColor()).toBe(barCls);
    }
  });
});
