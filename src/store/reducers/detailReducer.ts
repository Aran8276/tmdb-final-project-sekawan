import { Collection } from "@/types/Collection";
import { MovieDetailType } from "@/types/MovieDetail";
import { Similar } from "@/types/Similar";
import {
  SET_COLLECTION_DATA,
  SET_DETAIL_DATA,
  SET_SIMILAR_DATA,
  SET_VIDEO_DATA,
} from "../actions/detailAction";
import { Video } from "@/types/Video";

export interface DetailDataState {
  data: MovieDetailType | undefined;
  collection: Collection | undefined;
  similar: Similar | undefined;
  video: Video | undefined;
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

    default:
      return {
        ...state,
      };
  }
};
