import { describe, it, expect } from 'vitest';
import { FormatTitlePipe } from './format-title.pipe';

const pipe = new FormatTitlePipe();

describe('FormatTitlePipe', () => {
  it('removes a trailing (...) group', () => {
    expect(pipe.transform('So What (Remastered 2009)')).toBe('So What');
  });

  it('trims whitespace and handles null/undefined', () => {
    expect(pipe.transform('  Blue in Green  ')).toBe('Blue in Green');
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('keeps inner parentheses; only strips trailing', () => {
    expect(pipe.transform('Song (Live) at Village Vanguard')).toBe(
      'Song (Live) at Village Vanguard',
    );
    expect(pipe.transform('Take Five (Mono) ')).toBe('Take Five');
  });
});
