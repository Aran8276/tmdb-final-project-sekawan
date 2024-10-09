import { Genre } from "@/types/Genre";
import { Result } from "@/types/Search";

export const SET_GENRE = "SET_GENRE";
export const SET_DATA = "SET_DATA";
export const SET_SEARCH = "SET_SEARCH";

export const setGenre = (data: Genre) => {
  return { type: SET_GENRE, payload: data };
};

export const setData = (data: Result) => {
  return { type: SET_DATA, payload: data };
};

export const setSearch = (query: string) => {
  return { type: SET_SEARCH, payload: query };
};
