import { createAction, props } from '@ngrx/store';
import { Album } from '../models/Album';

export const loadRandomAlbum = createAction('[Album] Load Random Album');

export const loadRandomAlbumSuccess = createAction(
  '[Album] Load Random Album Success',
  props<{ album: Album }>()
)

export const loadRandomAlbumFailure = createAction(
  '[Album] Load Random Album Failure',
  props<{ error: string }>()
)
