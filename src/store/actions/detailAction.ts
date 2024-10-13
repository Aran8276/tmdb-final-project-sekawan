import { Collection } from "@/types/Collection";
import { MovieDetailType } from "@/types/MovieDetail";
import { Similar } from "@/types/Similar";
import { Video } from "@/types/Video";

export const SET_DETAIL_DATA = "SET_DETAIL_DATA";

export const SET_COLLECTION_DATA = "SET_COLLECTION_DATA";

export const SET_SIMILAR_DATA = "SET_SIMILAR_DATA";

export const SET_VIDEO_DATA = "SET_VIDEO_DATA";

export const SET_IS_FAVORITE = "SET_IS_FAVORITE";

export const SET_RATING = "SET_RATING";

export const SET_IS_RATED = "SET_IS_RATED";

export const setDetailData = (data: MovieDetailType) => {
  return { type: SET_DETAIL_DATA, payload: data };
};

export const setCollectionData = (collection: Collection) => {
  return { type: SET_COLLECTION_DATA, payload: collection };
};

export const setSimilarData = (similar: Similar) => {
  return { type: SET_SIMILAR_DATA, payload: similar };
};

export const setDetailVideoData = (video: Video) => {
  return { type: SET_VIDEO_DATA, payload: video };
};

export const setIsFavorite = (isFavorite: boolean) => {
  return { type: SET_IS_FAVORITE, payload: isFavorite };
};

export const setRating = (value: number) => {
  return { type: SET_RATING, payload: value };
};

export const setIsRated = (isRated: boolean) => {
  return { type: SET_IS_RATED, payload: isRated };
};
