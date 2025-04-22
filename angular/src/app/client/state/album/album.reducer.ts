import { createReducer, on } from '@ngrx/store';
import * as AlbumActions from './album.actions';
import { Album } from '../../models/Album';

export interface AlbumState {
  album: Album | null;
  loading: boolean;
  error: string | null;
}

const initialState: AlbumState = {
  album: null,
  loading: false,
  error: null
}

export const albumReducer = createReducer(
  initialState,

  on(AlbumActions.loadRandomAlbum, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AlbumActions.loadRandomAlbumSuccess, (state, { album }) => ({
    ...state,
    album,
    loading: false,
    error: null
  })),

  on(AlbumActions.loadRandomAlbumFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(AlbumActions.loadAlbumById, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AlbumActions.loadAlbumByIdSuccess, (state, { album }) => ({
    ...state,
    album,
    loading: false,
    error: null
  })),

  on(AlbumActions.loadAlbumByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
)
