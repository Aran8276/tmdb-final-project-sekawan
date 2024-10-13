import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl, requestHeader } from "@/Routes";
import { useEffect, useState } from "react";
import {
  setMovie,
  setNowPlaying,
  setPopular,
  setTopRated,
  setUpcoming,
  setVideo,
} from "@/store/actions/homeAction";
import { HomeState } from "@/store/reducers/homeReducer";
import { Result } from "@/types/NowPlaying";
import HomeView from "./HomeView";

export const availabilityHandler = (availability: string | undefined) => {
  switch (availability) {
    case "nowPlaying":
      return "Tayang Sekarang";

    case "popular":
      return "Sedang populer";

    case "topRated":
      return "Top Rated";

    case "upcoming":
      return "Akan Datang";

    default:
      return "";
  }
};

export default function HomePage() {
  const data: HomeState = useSelector((state: any) => state.home);
  const dispatch = useDispatch();
  const [isFetched, setIsFetched] = useState(false);

  const fetchNowPlaying = async () => {
    try {
      const res = await axios.get(
        baseUrl + "/movie/now_playing",
        requestHeader
      );
      dispatch(setNowPlaying(res.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchPopular = async () => {
    try {
      const res = await axios.get(baseUrl + "/movie/popular", requestHeader);
      // setData();
      dispatch(setPopular(res.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchTopRated = async () => {
    try {
      const res = await axios.get(baseUrl + "/movie/top_rated", requestHeader);
      dispatch(setTopRated(res.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchUpcoming = async () => {
    try {
      const res = await axios.get(baseUrl + "/movie/upcoming", requestHeader);
      dispatch(setUpcoming(res.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchVideo = async (id: string) => {
    try {
      const res = await axios.get(
        baseUrl + "/movie/" + id + "/videos",
        requestHeader
      );
      dispatch(setVideo(res.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchNowPlaying(),
        fetchPopular(),
        fetchTopRated(),
        fetchUpcoming(),
      ]);
      setIsFetched(true);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isFetched) {
      const filteredKeys = Object.keys(data).filter((key) =>
        ["nowPlaying", "popular", "topRated", "upcoming"].includes(key)
      );

      const randomKey =
        filteredKeys[Math.floor(Math.random() * filteredKeys.length)];

      const randomAvailableData = data[randomKey as keyof HomeState] as {
        results: Array<Result>;
      };

      const randomMovie =
        randomAvailableData.results[
          Math.floor(Math.random() * randomAvailableData.results.length)
        ];

      const dataToStore = {
        ...randomMovie,
        availability: randomKey,
      };
      fetchVideo(randomMovie.id.toString());
      dispatch(setMovie(dataToStore));
      return;
    }
  }, [isFetched]);
  useEffect(() => {}, [data]);

  return <HomeView data={data} />;
}
