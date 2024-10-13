import { Collection } from "@/types/Collection";
import { MovieDetailType } from "@/types/MovieDetail";
import { Similar } from "@/types/Similar";
import {
  SET_COLLECTION_DATA,
  SET_DETAIL_DATA,
  SET_IS_FAVORITE,
  SET_IS_RATED,
  SET_RATING,
  SET_SIMILAR_DATA,
  SET_VIDEO_DATA,
} from "../actions/detailAction";
import { Video } from "@/types/Video";

export interface DetailDataState {
  data: MovieDetailType | undefined;
  collection: Collection | undefined;
  similar: Similar | undefined;
  video: Video | undefined;
  isFavorite: boolean;
  rating: number;
  isRated: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: DetailDataState = {
  data: undefined,
  collection: undefined,
  similar: undefined,
  video: undefined,
  isFavorite: false,
  rating: 0,
  isRated: false,
};

export const detailReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_DETAIL_DATA:
      return {
        ...state,
        data: action.payload,
      };

    case SET_COLLECTION_DATA:
      return {
        ...state,
        collection: action.payload,
      };

    case SET_SIMILAR_DATA:
      return {
        ...state,
        similar: action.payload,
      };

    case SET_VIDEO_DATA:
      return {
        ...state,
        video: action.payload,
      };

    case SET_IS_FAVORITE:
      return {
        ...state,
        isFavorite: action.payload,
      };

    case SET_RATING:
      return {
        ...state,
        rating: action.payload,
      };

    case SET_IS_RATED:
      return {
        ...state,
        isRated: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
