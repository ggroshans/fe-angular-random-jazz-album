import { Pipe, PipeTransform } from '@angular/core';
import { Album } from '../../models/Album';

@Pipe({ name: 'artistDisplay', standalone: false })
export class ArtistDisplayPipe implements PipeTransform {
  transform(album: Pick<Album, 'artists' | 'additionalArtists'> | null | undefined): string {
    const main = album?.artists?.[0]?.name ?? 'Unknown Artist';
    const extra = album?.additionalArtists?.trim();
    return extra ? `${main}, ${extra}` : main;
  }
}
