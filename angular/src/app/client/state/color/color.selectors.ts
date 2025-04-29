import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ColorState } from "./color.reducer";

export const selectColorState = createFeatureSelector<ColorState>('color');

export const selectMainColor = createSelector(
  selectColorState,
  (state) => state.mainColor
);

export const selectSecondaryColor = createSelector(
  selectColorState,
  (state) => state.secondaryColor
);
