import { Artist } from './Artist';
import { Genre } from './Genre';
import { JazzEra } from './JazzEra';
import { Mood } from './Mood';

export interface Album {
  // Spotify
  id?: number;
  spotifyId: string; // Spotify
  imageUrl?: string; // Spotify
  label?: string; // Spotify
  releaseYear?: string; // Spotify
  totalTracks?: number; // Spotify
  artists: Artist[]; // Spotify
  spotifyPopularity?: number; // Spotify
  title?: string; // Spotify

  // Song Link API
  youtubeId?: string; // Song Link API
  appleMusicId?: string; // Song Link API
  amazonMusicId?: string; // Song Link API
  pandoraId?: string; // Song Link API

  // GPT
  genres?: Genre[]; // GPT
  subgenres?: string[]; // GPT
  description?: string; // GPT
  moods?: Mood[]; // GPT
  isOriginalRelease?: boolean; // GPT
  jazzEras: JazzEra[];

  // Computed
  additionalArtists?: string; // Computed
  originalAlbumOrder?: number; // Computed
  popularityRating?: number; // Computed
  averageEmotionalTone?: number; // Computed
  averageEnergyLevel?: number; // Computed
  sortableDate?: number; // Computed
}
