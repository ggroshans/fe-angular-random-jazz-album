import { createReducer, on } from "@ngrx/store";
import { setColors } from "./color.action";

export interface ColorState {
  mainColor: string
  secondaryColor: string
};

const initialState: ColorState = {
  mainColor: "black",
  secondaryColor: "white",
};

export const colorReducer = createReducer(
  initialState,
  on(setColors, (state, { mainColor, secondaryColor }) => ({
    ...state,
    mainColor,
    secondaryColor
  }))
);
