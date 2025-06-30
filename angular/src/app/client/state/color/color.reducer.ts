import { createReducer, on } from '@ngrx/store';
import { setColors } from './color.action';

export interface ColorState {
  lightColorBase: string;
  darkColorBase: string;
}

const initialState: ColorState = {
  lightColorBase: 'white',
  darkColorBase: 'black',
};

export const colorReducer = createReducer(
  initialState,
  on(setColors, (state, { lightColorBase, darkColorBase }) => ({
    ...state,
    lightColorBase,
    darkColorBase,
  })),
);
