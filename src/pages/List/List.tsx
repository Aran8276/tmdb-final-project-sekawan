import { ListState } from "@/store/reducers/listReducer";
import ListView from "./ListView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { baseUrl, requestHeader } from "@/Routes";
import { setData, setGenre } from "@/store/actions/listAction";
import axios, { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import SearchView from "./SearchView";

export default function List() {
  // const context = useContext(SearchContext);
  // if (!context) {
  //   throw new Error("useContext must be used within a SearchContext Provider");
  // }
  const data: ListState = useSelector((state: any) => state.list);
  const dispatch = useDispatch();
  const [page, setPage] = useSearchParams();
  const searchString = page.get("query");
  const handlePage = page.get("page") ? Number(page.get("page")) : 1;

  const fetchGenres = async () => {
    try {
      const res = await axios.get(baseUrl + "/genre/movie/list", requestHeader);
      dispatch(setGenre(res.data));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const fetchTrending = async (page?: number) => {
    try {
      if (page) {
        const res = await axios.get(
          baseUrl + `/trending/movie/day?page=${page}`,
          requestHeader
        );
        dispatch(setData(res.data));
        return;
      }
      const res = await axios.get(
        baseUrl + "/trending/movie/day",
        requestHeader
      );
      dispatch(setData(res.data));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const fetchSearch = async (query: string, page?: number) => {
    try {
      if (page) {
        const res = await axios.get(
          baseUrl +
            `/search/movie?query=${query}&page=${page}&include_adult=false`,
          requestHeader
        );
        dispatch(setData(res.data));
        return;
      }
      const res = await axios.get(
        baseUrl + `/search/movie?query=${query}&include_adult=false`,
        requestHeader
      );
      dispatch(setData(res.data));
      return;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (searchString) {
      return;
    }
    const fetchData = async () => {
      await Promise.all([fetchTrending(), fetchGenres()]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchString) {
      fetchSearch(searchString, handlePage);
      return;
    }
    fetchTrending(handlePage);
  }, [page]);

  // useEffect(() => {
  //   if (searchString == "") {
  //     fetchTrending();
  //     return;
  //   }
  //   fetchSearch(searchString);
  // }, [searchString]);

  return page.get("query") ? (
    <SearchView
      searchString={searchString ? searchString : ""}
      pageHandler={setPage}
      currentPage={handlePage}
      data={data.data}
    />
  ) : (
    <ListView
      genres={data.genres}
      pageHandler={setPage}
      currentPage={handlePage}
      data={data.data}
    />
  );
}
