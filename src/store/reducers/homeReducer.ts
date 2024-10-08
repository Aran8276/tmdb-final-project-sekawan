import { NowPlaying } from "@/types/NowPlaying";
import { Popular } from "@/types/Popular";
import { TopRated } from "@/types/TopRated";
import { Upcoming } from "@/types/Upcoming";
import {
  SET_MOVIE,
  SET_NOW_PLAYING,
  SET_POPULAR,
  SET_TOP_RATED,
  SET_UPCOMING,
  SET_VIDEO,
} from "../actions/homeAction";
import { Video } from "@/types/Video";

export interface Movie {
  availability: string | undefined;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface HomeState {
  nowPlaying: NowPlaying | undefined;
  popular: Popular | undefined;
  topRated: TopRated | undefined;
  upcoming: Upcoming | undefined;
  video: Video | undefined;
  movie: Movie | undefined;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: HomeState = {
  nowPlaying: undefined,
  popular: undefined,
  topRated: undefined,
  upcoming: undefined,
  video: undefined,
  movie: undefined,
};

export const homeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_NOW_PLAYING:
      return {
        ...state,
        nowPlaying: action.payload,
      };

    case SET_POPULAR:
      return {
        ...state,
        popular: action.payload,
      };

    case SET_TOP_RATED:
      return {
        ...state,
        topRated: action.payload,
      };

    case SET_UPCOMING:
      return {
        ...state,
        upcoming: action.payload,
      };

    case SET_VIDEO:
      return {
        ...state,
        video: action.payload,
      };

    case SET_MOVIE:
      return {
        ...state,
        movie: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
