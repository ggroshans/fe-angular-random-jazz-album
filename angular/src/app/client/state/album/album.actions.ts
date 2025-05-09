import { createAction, props } from '@ngrx/store';
import { Album } from '../../models/Album';

export const loadRandomAlbum = createAction('[Album] Load Random Album');
export const loadRandomAlbumSuccess = createAction(
  '[Album] Load Random Album Success',
  props<{ album: Album }>()
)
export const loadRandomAlbumFailure = createAction(
  '[Album] Load Random Album Failure',
  props<{ error: string }>()
)

export const loadAlbumById = createAction(
  '[Album] Load Album',
  props<{ id: number }>()
)
export const loadAlbumByIdSuccess = createAction(
  '[Album] Load Album Success',
  props<{ album: Album }>()
)
export const loadAlbumByIdFailure = createAction(
  '[Album] Load Album Failure',
  props<{ error: string }>()
)

export const setAlbumColors = createAction(
  "[Color] Set Colors",
  props<{ lightColorBase: string, darkColorBase: string }>()
);
