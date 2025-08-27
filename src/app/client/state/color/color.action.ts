import { createAction, props } from '@ngrx/store';

export const setColors = createAction(
  '[Color] Set Colors',
  props<{ lightColorBase: string; darkColorBase: string; tertiaryColor: string }>(),
);
