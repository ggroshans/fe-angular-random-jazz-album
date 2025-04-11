import { createAction, props } from "@ngrx/store";
import { Artist } from "../../models/Artist";

export const loadArtist = createAction(
  '[Action] Load Random Artist',
  props<{ artistId: number }>()
);

export const loadArtistSuccess = createAction(
  '[Action] Load Random Artist Success',
  props<{ artist: Artist }>()
)

export const loadArtistFailure = createAction(
  '[Action] Load Random Artist Error',
  props<{ error: string }>()
)
