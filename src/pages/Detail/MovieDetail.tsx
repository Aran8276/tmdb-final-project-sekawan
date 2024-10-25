import { useEffect, useState } from "react";
import MovieDetailView from "./MovieDetailView";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { baseUrl, requestHeader, sessionIdGetter } from "@/Routes";
import { useDispatch, useSelector } from "react-redux";
import { DetailDataState } from "@/store/reducers/detailReducer";
import {
  setCollectionData,
  setDetailData,
  setDetailVideoData,
  setIsFavorite,
  setIsRated,
  setRating,
  setSimilarData,
} from "@/store/actions/detailAction";
import { Result } from "@/types/NowPlaying";
import { toast } from "sonner";

export default function MovieDetail() {
  const data: DetailDataState = useSelector((state: any) => state.detail);
  const dispatch = useDispatch();
  const [isFetched, setIsFetched] = useState(false);
  const { id } = useParams();

  const fetchVideo = async (id: string) => {
    try {
      const res = await axios.get(
        baseUrl + "/movie/" + id + "/videos",
        requestHeader
      );
      dispatch(setDetailVideoData(res.data));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const fetchDetail = async () => {
    try {
      const res = await axios.get(baseUrl + "/movie/" + id, requestHeader);
      dispatch(setDetailData(res.data));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const fetchSimilar = async (id: string) => {
    try {
      const response = await axios.get(
        baseUrl + `/movie/${id}/similar`,
        requestHeader
      );
      dispatch(setSimilarData(response.data));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const fetchCollection = async (collectionId: string) => {
    try {
      const response = await axios.get(
        baseUrl + `/collection/${collectionId}`,
        requestHeader
      );
      dispatch(setCollectionData(response.data));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const fetchData = async () => {
    await fetchDetail();
    setIsFetched(true);
    window.scrollTo(0, 0);
  };

  const checkRating = async (id: number) => {
    try {
      const res = await axios.get(
        baseUrl + `/account/null/rated/movies?session_id=${sessionIdGetter}`,
        requestHeader
      );
      const results = res.data.results;
      const filtered = results.filter((result: Result) => result.id == id);
      if (filtered.length < 1) {
        dispatch(setIsRated(false));
        return;
      }
      dispatch(setIsRated(true));
      dispatch(setRating(filtered[0].rating));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const handleRating = async (
    id: number | undefined,
    action: "add" | "delete",
    value?: number
  ) => {
    if (!id) {
      return;
    }
    const url = baseUrl + `/movie/${id}/rating?session_id=${sessionIdGetter}`;
    try {
      if (action == "delete") {
        const res = await axios.delete(url, requestHeader);

        return;
      }
      if (!value) {
        return;
      }
      const res = await axios.post(url, { value: value }, requestHeader);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const checkFavorite = async (id: number) => {
    try {
      const res = await axios.get(
        baseUrl + `/account/null/favorite/movies?session_id=${sessionIdGetter}`,
        requestHeader
      );
      const results = res.data.results;
      const filtered = results.filter((result: Result) => result.id == id);
      if (filtered.length < 1) {
        dispatch(setIsFavorite(false));
        return;
      }
      dispatch(setIsFavorite(true));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const handleFavorite = async (
    id: number | undefined,
    action: "add" | "delete"
  ) => {
    if (!id) {
      return;
    }
    try {
      if (action == "delete") {
        await axios.post(
          baseUrl + `/account/null/favorite?session_id=${sessionIdGetter}`,
          {
            media_id: id,
            media_type: "movie",
            favorite: false,
          },
          requestHeader
        );
        toast.success("Film berhasil dihapus dari daftar Favorit");
        dispatch(setIsFavorite(false));
        return;
      }
      await axios.post(
        baseUrl + `/account/null/favorite?session_id=${sessionIdGetter}`,
        {
          media_id: id,
          media_type: "movie",
          favorite: true,
        },
        requestHeader
      );
      toast.success("Film berhasil ditambahkan ke daftar Favorit");
      dispatch(setIsFavorite(true));
      return;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const handleDelete = (id: number) => {
    handleRating(id, "delete");
    toast.success("Ulasan berhasil dihapus!");
    dispatch(setIsRated(false));
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsFetched(false);
    if (id) {
      fetchData();
      return;
    }
  }, [id]);

  useEffect(() => {
    if (isFetched && data.data?.belongs_to_collection) {
      checkFavorite(data.data ? data.data.id : 0);
      checkRating(data.data ? data.data.id : 0);
      fetchVideo(data.data ? data.data.id.toString() : "");
      fetchSimilar(data.data ? data.data?.id.toString() : "");
      fetchCollection(data.data.belongs_to_collection.id.toString());
      return;
    }
    if (isFetched) {
      checkFavorite(data.data ? data.data.id : 0);
      checkRating(data.data ? data.data.id : 0);
      fetchVideo(data.data ? data.data.id.toString() : "");
      fetchSimilar(data.data ? data.data?.id.toString() : "");
    }
  }, [isFetched]);

  return data ? (
    <MovieDetailView
      handleDelete={handleDelete}
      handleRating={handleRating}
      handleFavorite={handleFavorite}
      isRated={data.isRated}
      isFavorite={data.isFavorite}
      collection={data.collection}
      similar={data.similar}
      video={data.video?.results}
      data={data.data}
      rating={data.rating}
    />
  ) : (
    <span>Loading</span>
  );
}
