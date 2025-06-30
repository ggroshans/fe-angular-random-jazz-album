import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArtistState } from './artist.reducer';

export const selectArtistState = createFeatureSelector<ArtistState>('artist');

export const selectArtist = createSelector(selectArtistState, (state) => state.artist);
