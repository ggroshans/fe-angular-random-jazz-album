import { Artist } from "./Artist";
import { Genre } from "./Genre";
import { Mood } from "./Mood";
import { Subgenre } from "./Subgenre";

export interface Album {
  id?: number;
  title?: string;
  description?: string;
  theme?: string;
  imageUrl?: string;
  label?: string;
  popularTracks?: string[];
  releaseYear?: string;
  totalTracks?: number;
  popularityScore?: number;
  percentileScore?: number;
  genre?: Genre;
  spotifyId: string;
  youtubeId: string;
  appleMusicId: string;
  amazonMusicId: string;
  pandoraId: string;
  subgenres?: Subgenre[];
  artists?: Artist[];
  moods?: Mood[];


  // duration?: string;
  // suggestedListeningTime?: string; // explicit
  // jazzEra?: string[]; // explicit
  // moodScore?: number;
}
