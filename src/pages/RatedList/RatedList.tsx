import { useEffect, useState } from "react";
import RatedListView from "./RatedListView";
import axios, { AxiosError } from "axios";
import { baseUrl, requestHeader, sessionIdGetter } from "@/Routes";
import { Favorite } from "@/types/Favorite";
import { useSearchParams } from "react-router-dom";

export default function RatedList() {
  const [data, setData] = useState<Favorite | undefined>(undefined);
  const [page, setPage] = useSearchParams();
  const handlePage = page.get("page") ? Number(page.get("page")) : 1;

  const fetchRated = async () => {
    try {
      const res = await axios.get(
        baseUrl + `/account/null/rated/movies?session_id=${sessionIdGetter}`,
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
    fetchRated();
  }, []);

  return (
    <RatedListView
      currentPage={handlePage}
      pageHandler={setPage}
      total_pages={data?.total_pages ? data?.total_pages : 1}
      data={data}
    />
  );
}
