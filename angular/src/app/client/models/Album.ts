import { Artist } from './Artist';
import { Genre } from './Genre';
import { Mood } from './Mood';
import { Subgenre } from './Subgenre';

export interface Album {
  id?: number;
  title?: string;
  youtubeId: string; // Song link Api
  appleMusicId: string; // Song link Api
  amazonMusicId: string; // Song link Api
  pandoraId: string; // Song link Api
  spotifyId: string; // Spotify Api
  imageUrl?: string; // Spotify Api
  label?: string; // Spotify Api
  releaseYear?: string; // Spotify Api
  totalTracks?: number; // Spotify Api

  artists?: Artist[]; // Spotify Api
  popularityScore?: number; // Spotify Api

  genres?: Genre[]; // Gpt Api
  subgenres?: Subgenre[]; // Gpt Api
  description?: string; // Gpt Api
  theme?: string; // Gpt Api
  moods?: Mood[]; // Gpt Api
  isOriginalRelease: boolean;
  percentileScore?: number; // Computed from => popularityScore         --field!
  emotionScore?: number; // Computed
  energyScore?: number; // Computed

  // jazzEras?: string[]; // explicit // Computed from => releaseYear             --field!
  // averageEmotionScore?: number; // Computed                                    --field
  // averageEnergyScore?: number; // Computed                                     --field
  // originalAlbumOrder: number; // Computed                                      --field
}
