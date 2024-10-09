import MovieCarousel from "@/components/MovieCarousel";
import { formatDate, getTrailerSrcById } from "@/Routes";
import { HomeState } from "@/store/reducers/homeReducer";
import { EllipsisVertical, Play, Plus, Popcorn } from "lucide-react";
import { availabilityHandler } from "./Home";

interface SelfProps {
  data: HomeState;
}

export default function HomeView(props: SelfProps) {
  return (
    <div className="flex flex-col pb-12">
      <section className="relative flex-col border-2 bottom-10 overflow-clip">
        {props.data.video ? (
          <iframe
            width="1280"
            height="640"
            // src={getTrailerSrcById(props.data.video?.results[0].key)}
            // src={getTrailerSrcById("bXIenI02HhU")}
            // src={getTrailerSrcById("chltnmUN5ZI")}
            // src={getTrailerSrcById("q5PPNZiu52w")}
            src={getTrailerSrcById("0uOkigs9hnY")}
            className="top-0 bottom-0 w-full scale-[1.2]"
          />
        ) : (
          <></>
        )}
        <div className="absolute top-0 w-full h-full"></div>
        <div className="absolute h-full top-0 mx-48 py-24">
          <div className="flex flex-col space-y-2 w-[725px] text-white">
            <h1 className="font-bold text-8xl tracking-wide">
              {props.data.movie?.title}
            </h1>
            <div className="flex justify-between w-fit space-x-6 py-5 font-bold">
              <p>{availabilityHandler(props.data.movie?.availability)}</p>
              <EllipsisVertical />
              {props.data.movie?.release_date ? (
                <>
                  <p>
                    {formatDate(
                      props.data.movie?.release_date?.toString() || ""
                    )}
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="flex justify-between w-fit space-x-16 pt-8">
              <button
                type="button"
                className="scale-125 flex space-x-3 py-2.5 px-6 text-sm rounded-lg bg-red-500 text-white cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-red-700"
              >
                <Popcorn className="self-center" />
                <span className="self-center">Lihat Detail</span>
              </button>
              <button
                type="button"
                className="scale-125 flex space-x-2 py-2.5 px-6 text-sm border border-gray-300 rounded-lg shadow-xs bg-white font-semibold text-gray-900 transition-all duration-500 hover:bg-gray-300"
              >
                <Plus className="self-center" />
                <span className="self-center">Tambah ke Watchlist</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="text-white bg-[url('/galant.jpg')] bg-contain w-full h-[800px] p-16">
          </section> */}
      <section className="flex-col flex justify-center mx-48 py-12">
        <h2 className="font-bold pb-12 text-4xl">Film Tayang</h2>
        {props.data?.nowPlaying ? (
          <MovieCarousel data={props.data.nowPlaying} />
        ) : (
          <span>Loading</span>
        )}
      </section>
      <section className="flex-col flex justify-center mx-48 py-12">
        <h2 className="font-bold pb-12 text-4xl">Film Populer</h2>
        {props.data?.popular ? (
          <MovieCarousel data={props.data.popular} />
        ) : (
          <span>Loading</span>
        )}
      </section>
      <section className="flex-col flex justify-center mx-48 py-12">
        <h2 className="font-bold pb-12 text-4xl">Film Top Rated</h2>
        {props.data?.topRated ? (
          <MovieCarousel data={props.data.topRated} />
        ) : (
          <span>Loading</span>
        )}
      </section>
      <section className="flex-col flex justify-center mx-48 py-12">
        <h2 className="font-bold pb-12 text-4xl">Film Akan Datang</h2>
        {props.data?.upcoming ? (
          <MovieCarousel data={props.data.upcoming} />
        ) : (
          <span>Loading</span>
        )}
      </section>
      <div className="grid grid-cols-4 gap-4"></div>
    </div>
  );
}
