import { GenreData } from "@/types/Genre";

export const SET_GENRE_DATA = "SET_GENRE_DATA";

export const SET_GENRE_LABEL = "SET_GENRE_LABEL";

export const setGenreData = (data: GenreData) => {
  return { type: SET_GENRE_DATA, payload: data };
};

export const setGenreLabel = (label: string) => {
  return { type: SET_GENRE_LABEL, payload: label };
};
