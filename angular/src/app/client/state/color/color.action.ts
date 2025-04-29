import { createAction, props } from "@ngrx/store";

export const setColors = createAction(
  "[Color] Set Colors",
  props<{ mainColor: string, secondaryColor: string }>()
);
