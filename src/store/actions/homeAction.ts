import { NowPlaying } from "@/types/NowPlaying";
import { Popular } from "@/types/Popular";
import { TopRated } from "@/types/TopRated";
import { Upcoming } from "@/types/Upcoming";
import { Video } from "@/types/Video";

export const SET_NOW_PLAYING = "SET_NOW_PLAYING";
export const SET_POPULAR = "SET_POPULAR";
export const SET_TOP_RATED = "SET_TOP_RATED";
export const SET_UPCOMING = "SET_UPCOMING";
export const SET_VIDEO = "SET_VIDEO";
export const SET_MOVIE = "SET_MOVIE"

export const setNowPlaying = (nowPlaying: NowPlaying) => {
  return { type: SET_NOW_PLAYING, payload: nowPlaying };
};

export const setPopular = (popular: Popular) => {
  return { type: SET_POPULAR, payload: popular };
};

export const setTopRated = (topRated: TopRated) => {
  return { type: SET_TOP_RATED, payload: topRated };
};

export const setUpcoming = (upcoming: Upcoming) => {
  return { type: SET_UPCOMING, payload: upcoming };
};

export const setVideo = (video: Video) => {
  return { type: SET_VIDEO, payload: video };
};

export const setMovie = (movie: any) => {
  return { type: SET_MOVIE, payload: movie };
};
