import { Album } from './Album';
import { Genre } from './Genre';

export interface Artist {
  // Spotify
  id: number;
  name: string; // Spotify
  genres?: Genre[]; // Spotify
  imageUrl?: string; // Spotify

  // GPT
  biography?: string; // GPT
  instrument?: string; // GPT
  relatedArtists: string[]; // GPT
  influences: string[]; // GPT
  birthYear: string; // GPT
  deathYear?: string; // GPT

  // Computed
  popularityRating: number; // Computed
  totalAlbums?: number; // Computed
  debutYear: string; // Computed
  noteableAlbums?: Album[]; // Computed
  averageAlbumScore?: number; // Computed
  subgenreBreakdown?: { [subgenre: string]: number }; // Computed
  yearsActive?: { startDate: number; endDate: number }; // Computed
  averageEmotionalTone?: number; // Computed
  averageEnergyLevel?: number; // Computed
  averageAlbumPopularityRating: number; // Computed
  albumCount: number; // Computed
  studioAlbumCount: number; // Computed
  moodBreakdown?: { [mood: string]: number }; // Computed
}
