import { Artist } from './Artist';
import { Genre } from './Genre';
import { Mood } from './Mood';
import { Subgenre } from './Subgenre';

export interface Album {
  // Spotify
  id?: number;
  spotifyId: string; // Spotify
  imageUrl?: string; // Spotify
  label?: string; // Spotify
  releaseYear?: string; // Spotify
  totalTracks?: number; // Spotify
  artists?: Artist[]; // Spotify
  spotifyPopularity?: number; // Spotify
  title?: string; // Spotify

  // Song Link API
  youtubeId: string; // Song Link API
  appleMusicId: string; // Song Link API
  amazonMusicId: string; // Song Link API
  pandoraId: string; // Song Link API

  // GPT
  genres?: Genre[]; // GPT
  subgenres?: Subgenre[]; // GPT
  description?: string; // GPT
  moods?: Mood[]; // GPT
  isOriginalRelease: boolean; // GPT

  // Computed
  additionalArtists: string; // Computed
  originalAlbumOrder: number; // Computed
  popularityRating?: number; // Computed
  averageEmotionalTone?: number; // Computed
  averageEnergyLevel?: number; // Computed
  sortableDate: number; // Computed
  jazzEras?: string[]; // Computed
}
