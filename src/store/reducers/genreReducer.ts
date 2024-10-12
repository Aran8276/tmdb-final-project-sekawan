import { Genre } from "@/types/Genre";
import { SET_GENRE_DATA, SET_GENRE_LABEL } from "../actions/genreAction";

export interface GenreDataState {
  data: Genre | undefined;
  label: string;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: GenreDataState = {
  data: undefined,
  label: "",
};

export const genreReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_GENRE_DATA:
      return {
        ...state,
        data: action.payload,
      };

    case SET_GENRE_LABEL:
      return {
        ...state,
        label: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
