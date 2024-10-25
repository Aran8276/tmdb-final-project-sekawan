import { useParams, useSearchParams } from "react-router-dom";
import GenreView from "./GenreView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { baseUrl, requestHeader } from "@/Routes";
import { setGenreData, setGenreLabel } from "@/store/actions/genreAction";
import axios, { AxiosError } from "axios";
import { GenreDataState, GenreElement } from "@/types/Genre";

export default function Genre() {
  const { id } = useParams();
  const [isFetched, setIsFetched] = useState(false);
  const data: GenreDataState = useSelector((state: any) => state.genre);
  const dispatch = useDispatch();
  const [page, setPage] = useSearchParams();
  const handlePage = page.get("page") ? Number(page.get("page")) : 1;

  const fetchGenreList = async () => {
    try {
      const res = await axios.get(baseUrl + "/genre/movie/list", requestHeader);
      dispatch(setGenreLabel(res.data));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const fetchGenreData = async (page?: number) => {
    try {
      if (page) {
        const res = await axios.get(
          baseUrl +
            `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}&page=${page}`,
          requestHeader
        );
        dispatch(setGenreData(res.data));
        return;
      }
      const res = await axios.get(
        baseUrl +
          `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`,
        requestHeader
      );
      dispatch(setGenreData(res.data));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const getGenreNameById = (id: number, genres: GenreElement[]): string => {
    if (genres) {
      const genre = genres.find((genre) => genre.id === id);
      return genre ? genre.name : "Genre not found";
    }
    return "";
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchGenreData(), fetchGenreList()]);
      setIsFetched(true);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (page) {
      fetchGenreData(handlePage);
    }
  }, [page]);

  return (
    <GenreView
      maxPage={data?.data?.total_pages}
      pageHandler={setPage}
      currentPage={handlePage}
      label={getGenreNameById(Number(id), data?.label?.genres)}
      data={data.data}
    />
  );
}
