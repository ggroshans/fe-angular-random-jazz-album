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

  debutYear: string;                  // Computed from => earliest album release year
  noteableAlbums?: Album[];           // Computed from => top (5) albums based on percentile score
  // relatedArtists: string[]; // GPT                                                            --field!
  // influences: string[]; // GPT                                                                --field!

  averageAlbumScore?: number;         // Computed from => avg album percentile score             --field
  // subgenreBreakdown?: { [subgenre: string]: number }; // explicit subgenres // Computed       --field
  // jazzEra?: string[]; // explicit // Computed from era with highest album count               --field
  // yearsActive?: { startDate: number, endDate: number }; // Computed                           --field
  // averageEmotionScore?: number;  // Computed                                                  --field
  // averageEnergyScore?: number // Computed                                                     --field

  // DISCARD
  // moodBreakdown?: { [mood: string]: number }; // Computed   ---> compute on the fly?
}
