import { Album } from "./Album";
import { Genre } from "./Genre";

export interface Artist {
  id: number;
  name?: string;
  albums?: Album[];
  biography?: string;                 // Gpt Api
  instrument?: string;                // Gpt Api
  genres?: Genre[];                   // Spotify Api
  imageUrl?: string;                  // Spotify Api
  popularityScore?: number;           // Spotify Api

  percentileScore: number;            // Computed from => popularityScore
  totalAlbums?: number;               // Computed from => total of artist's albums
  averageAlbumScore?: number;         // Computed from => avg album percentile score
  debutYear: string;                  // Computed from => earliest album release year
  noteableAlbums?: Album[];           // Computed from => top (5) albums based on percentile score


  // subgenreBreakdown?: { [subgenre: string]: number }; // explicit subgenres // Computed
  // jazzEra?: string[]; // explicit // Computed from era with highest album count
  // yearsActive?: { startDate: number, endDate: number }; // Computed
  // moodBreakdown?: { [mood: string]: number }; // Computed
  // averageMoodScore?: number;  // Computed
  // relatedArtists: string[]; // GPT
  // influences: string[]; // GPT
}
