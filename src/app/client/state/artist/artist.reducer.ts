import { createReducer, on } from '@ngrx/store';
import { Artist } from '../../models/Artist';
import * as ArtistActions from './artist.actions';

export interface ArtistState {
  artist: Artist | null;
  loading: boolean | null;
  error: string | null;
}

const initialState: ArtistState = {
  artist: null,
  loading: false,
  error: null,
};

export const artistReducer = createReducer(
  initialState,

  on(ArtistActions.loadArtist, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ArtistActions.loadArtistSuccess, (state, { artist }) => ({
    ...state,
    artist,
    loading: false,
    error: null,
  })),

  on(ArtistActions.loadArtistFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
