import { render, screen } from '@testing-library/angular';
import { describe, it, expect } from 'vitest';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { AlbumHeroComponent } from './album-hero.component';
import { Album } from 'src/app/client/models/Album';

@Pipe({ name: 'artistDisplay' })
class ArtistPipe implements PipeTransform {
  transform() {
    return 'Miles Davis';
  }
}
@Pipe({ name: 'stripTrailingParens' })
class StripPipe implements PipeTransform {
  transform(v: string) {
    return v.replace(/\s*\([^)]*\)$/, '');
  }
}
@Component({ selector: 'mat-icon', template: '<ng-content></ng-content>' })
class IconStub {}

describe('AlbumHeroComponent', () => {
  it('renders album info and links', async () => {
    const album: Album = {
      imageUrl: '/cover.jpg',
      title: 'Kind of Blue (Remastered)',
      sortableDate: 19590817,
      description: 'Classic modal jazz record.',
      spotifyId: 'SPOT123',
      youtubeId: 'YT123',
      amazonMusicId: 'AMZ123',
      pandoraId: 'pandora/miles-davis',
      appleMusicId: 'APPLE123',
      isOriginalRelease: true,
      additionalArtists: '',
      originalAlbumOrder: 1,
    };

    await render(AlbumHeroComponent, {
      declarations: [ArtistPipe, StripPipe, IconStub],
      componentProperties: { album },
    });

    expect(screen.getByRole('heading', { name: /kind of blue/i })).toBeInTheDocument();
    expect(screen.getByText(/miles davis/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
  });
});
