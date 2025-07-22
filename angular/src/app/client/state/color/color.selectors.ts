import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ColorState } from './color.reducer';

export const selectColorState = createFeatureSelector<ColorState>('color');

export const selectLightColorBase = createSelector(
  selectColorState,
  (state) => state.lightColorBase,
);

export const selectDarkColorBase = createSelector(selectColorState, (state) => state.darkColorBase);

export const selectTertiaryColor = createSelector(selectColorState, (state) => state.tertiaryColor);
