import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import MovieCarousel from "@/components/MovieCarousel";
import {
  baseUrl,
  formatDate,
  getTrailerSrcById,
  requestHeader,
} from "@/Routes";
import { EllipsisVertical, Play, Plus } from "lucide-react";
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
      const res = await axios.get(
        baseUrl + "/trending/movie/day",
        requestHeader
      );
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

      const randomAvailableData = data[randomKey as keyof HomeState];

      const randomMovie =
        randomAvailableData?.results[
          Math.floor(Math.random() * randomAvailableData.results?.length)
        ];

      const dataToStore = {
        ...randomMovie,
        availability: randomKey,
      };
      fetchVideo(randomMovie.id);
      dispatch(setMovie(dataToStore));
      return;
    }
  }, [isFetched]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-col pb-12">
      <section className="relative">
        {data.video ? (
          <iframe
            width="1280"
            height="720"
            src={getTrailerSrcById(data.video?.results[0].key)}
            className="top-0 bottom-0 w-full"
          ></iframe>
        ) : (
          <></>
        )}
        <div className="absolute top-0 w-[200px] h-full"></div>
        <div className="absolute w-[1344px] h-full top-0 mx-48 py-24">
          <div className="flex flex-col space-y-2 w-[725px] text-white">
            <h1 className="font-bold text-8xl tracking-wide">
              {data.movie?.title}
            </h1>
            <div className="flex justify-between w-fit space-x-6 py-5 font-bold">
              <p>{data.movie?.availability}</p>
              <EllipsisVertical />
              {data.movie?.release_date ? (
                <>
                  <p>
                    {formatDate(data.movie?.release_date?.toString() || "")}
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="flex justify-between w-fit space-x-12 pt-8">
              <button className="flex space-x-3 bg-red-500 rounded-full py-5 px-10 text-xl font-bold hover:bg-red-400 transition-colors shadow-lg">
                <Play className="self-center" />
                <span>LIHAT DETAIL</span>
              </button>
              <button className="flex space-x-3 bg-white rounded-full py-5 px-10 text-xl font-bold text-black hover:bg-gray-400 transition-colors shadow-lg">
                <Plus className="self-center" />
                <span>TAMBAH KE DAFTAR</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="text-white bg-[url('/galant.jpg')] bg-contain w-full h-[800px] p-16">
      </section> */}
      <section className="flex-col flex justify-center mx-48 py-12">
        <h2 className="font-bold pb-12 text-4xl">Film Tayang</h2>
        {data?.nowPlaying ? (
          <MovieCarousel data={data.nowPlaying} />
        ) : (
          <span>Loading</span>
        )}
      </section>
      <section className="flex-col flex justify-center mx-48 py-12">
        <h2 className="font-bold pb-12 text-4xl">Film Trending</h2>
        {data?.popular ? (
          <MovieCarousel data={data.popular} />
        ) : (
          <span>Loading</span>
        )}
      </section>
      <section className="flex-col flex justify-center mx-48 py-12">
        <h2 className="font-bold pb-12 text-4xl">Film Top Rated</h2>
        {data?.topRated ? (
          <MovieCarousel data={data.topRated} />
        ) : (
          <span>Loading</span>
        )}
      </section>
      <section className="flex-col flex justify-center mx-48 py-12">
        <h2 className="font-bold pb-12 text-4xl">Film Akan Datang</h2>
        {data?.upcoming ? (
          <MovieCarousel data={data.upcoming} />
        ) : (
          <span>Loading</span>
        )}
      </section>
      <div className="grid grid-cols-4 gap-4"></div>
    </div>
  );
}
