import { Genre } from "./Genre";

export interface Artist {
  id: number;
  name: string;
  biography: string;
  genres: Genre[];
  imageUrl: string;
  popularityScore: number;
  percentileScore: number;
}
