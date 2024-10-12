export interface GenreData {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface GenreDataState {
  data: Data;
  label: Label;
}

export interface Data {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: null | string;
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

export interface Label {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Result {
  adult: boolean;
  backdrop_path: null | string;
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

export interface Genre {
  genres: GenreElement[];
}

export interface GenreElement {
  id: number;
  name: string;
}
