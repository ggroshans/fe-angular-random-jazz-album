import { createReducer, on } from '@ngrx/store';
import { setColors } from './color.action';

export interface ColorState {
  lightColorBase: string;
  darkColorBase: string;
  tertiaryColor: string;
}

const initialState: ColorState = {
  lightColorBase: 'white',
  darkColorBase: 'black',
  tertiaryColor: '',
};

export const colorReducer = createReducer(
  initialState,
  on(setColors, (state, { lightColorBase, darkColorBase, tertiaryColor }) => ({
    ...state,
    lightColorBase,
    darkColorBase,
    tertiaryColor,
  })),
);
