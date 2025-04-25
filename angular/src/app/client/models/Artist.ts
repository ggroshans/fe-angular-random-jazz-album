import { Album } from "./Album";
import { Genre } from "./Genre";

export interface Artist {
  id: number;
  name?: string;
  biography?: string;
  genres?: Genre[];
  imageUrl?: string;
  instrument?: string;
  popularityScore?: number;
  percentileScore: number;

  totalAlbums?: number; // Computed
  averageAlbumScore?: number;  // Computed
  // subgenreBreakdown?: { [subgenre: string]: number }; // explicit subgenres // Computed
  // jazzEra?: string[]; // explicit
  // birthDate?: string; // GPT
  // deathDate?: string; // GPT
  // yearsActive?: { startDate: number, endDate: number }; // GPT
  // moodBreakdown?: { [mood: string]: number }; // Computed
  // averageMoodScore?: number;  // Computed
  // funFact?: string; // GPT
  albums?: Album[];
  noteableAlbums?: Album[];

  // relatedArtists: string[]; // GPT
  // influences: string[]; // GPT
  // influenced: string[]; // GPT
}
