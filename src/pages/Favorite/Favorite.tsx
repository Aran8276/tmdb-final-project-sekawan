import { baseUrl, requestHeader, sessionIdGetter } from "@/Routes";
import FavoriteView from "./FavoriteView";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Favorite as FavoriteType } from "@/types/Favorite";
import { useSearchParams } from "react-router-dom";

export default function Favorite() {
  const [data, setData] = useState<FavoriteType | undefined>(undefined);
  const [page, setPage] = useSearchParams();
  const handlePage = page.get("page") ? Number(page.get("page")) : 1;

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(
        baseUrl + `/account/null/favorite/movies?session_id=${sessionIdGetter}`,
        requestHeader
      );
      setData(res.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <FavoriteView
      currentPage={handlePage}
      pageHandler={setPage}
      total_pages={data?.total_pages ? data?.total_pages : 1}
      data={data}
    />
  );
}
