import { describe, it, expect } from 'vitest';
import { ArtistDisplayPipe } from './artist-display.pipe';

const pipe = new ArtistDisplayPipe();

describe('ArtistDisplayPipe', () => {
  it('shows main artist + additional when present', () => {
    const album: any = { artists: [{ name: 'Miles Davis' }], additionalArtists: 'John Coltrane' };
    expect(pipe.transform(album)).toBe('Miles Davis, John Coltrane');
  });

  it('falls back to main only or "Unknown Artist"', () => {
    expect(pipe.transform({ artists: [{ name: 'Nina Simone' }] } as any)).toBe('Nina Simone');
    expect(pipe.transform({ artists: [], additionalArtists: '  ' } as any)).toBe('Unknown Artist');
    expect(pipe.transform(null as any)).toBe('Unknown Artist');
  });

  it('trims additional artists', () => {
    const album: any = {
      artists: [{ name: 'Herbie Hancock' }],
      additionalArtists: '  Wayne Shorter  ',
    };
    expect(pipe.transform(album)).toBe('Herbie Hancock, Wayne Shorter');
  });
});
