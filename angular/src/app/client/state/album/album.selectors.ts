import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlbumState } from './album.reducer';

export const selectAlbumState = createFeatureSelector<AlbumState>('album');

export const selectAlbum = createSelector(selectAlbumState, state => state.album);

export const selectLoading = createSelector(selectAlbumState, state => state.loading);

export const selectError = createSelector(selectAlbumState, state => state.error);
