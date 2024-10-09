import { Search } from "@/types/Search";
import { SET_DATA, SET_GENRE, SET_SEARCH } from "../actions/listAction";
import { Genre } from "@/types/Genre";

export interface ListState {
  genres: Genre | undefined;
  data: Search | undefined;
  search: string;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: ListState = {
  genres: undefined,
  data: undefined,
  search: "",
};

export const listReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_GENRE:
      return {
        ...state,
        genres: action.payload,
      };

    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };

    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
