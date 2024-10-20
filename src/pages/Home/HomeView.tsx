import MovieCarousel from "@/components/MovieCarousel";
import { getTrailerSrcById } from "@/Routes";
import { HomeState } from "@/store/reducers/homeReducer";
import { Plus, Popcorn } from "lucide-react";
import { availabilityHandler } from "./Home";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SelfProps {
  data: HomeState;
}

export default function HomeView(props: SelfProps) {
  return (
    <div className="flex flex-col overflow-clip">
      <section className="relative flex-col overflow-clip">
        {props.data.video ? (
          <iframe
            width="1920"
            height="1080"
            src={getTrailerSrcById(
              props.data.video?.results.length > 0
                ? props.data.video?.results[0].key
                : ""
            )}
            className="top-0 bottom-0 w-full scale-[1.75]"
          />
        ) : (
          <></>
        )}
        <div className="flex justify-start items-center absolute top-0 bottom-0 right-0 left-0 w-full h-full">
          <div className="pl-12 z-10">
            <div className="flex flex-col pb-32 space-y-6 text-white">
              <div className="pl-10">
                <Badge
                  className="font-normal border-0 bg-gray-500 scale-[1.75]"
                  variant="outline"
                >
                  {availabilityHandler(props.data.movie?.availability)}
                </Badge>
              </div>
              <h1 className="text-7xl font-semibold">
                {props.data.movie?.title}
              </h1>
              <p className="w-[600px] font-light line-clamp-3">
                {props.data.movie?.overview}
              </p>
              <div className="flex space-x-3">
                <Link to={`/movie/${props.data.movie?.id}`}>
                  <Button
                    className="flex items-center space-x-3 font-medium text-lg text-white bg-neutral-600 dark:bg-background"
                    size="lg"
                  >
                    <Popcorn />
                    <span>Lihat Detail</span>
                  </Button>
                </Link>

                <Button
                  className="flex items-center space-x-3 font-medium text-lg text-black bg-white"
                  size="lg"
                  variant="outline"
                >
                  <Plus />
                  <span>Favorit</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[2400px] bg-transparent">
        <div className="h-[2900px] relative bottom-[500px] bg-gradient-to-b from-transparent via-10% via-black to-black dark:via-background dark:to-background pl-12">
          <div className="flex flex-col  space-y-12 relative top-[100px] bottom-0 left-0 right-0">
            <section className="flex-col ml-12 mr-24 flex justify-center">
              <h2 className="font-medium pb-12 relative right-12 text-4xl text-white">
                Populer
              </h2>
              {props.data?.popular ? (
                <MovieCarousel data={props.data.popular} />
              ) : (
                <span>Loading</span>
              )}
            </section>

            <section className="flex-col ml-12 mr-24 flex justify-center">
              <h2 className="font-medium pb-12 relative right-12 text-4xl text-white">
                Tayang
              </h2>
              {props.data?.nowPlaying ? (
                <MovieCarousel data={props.data.nowPlaying} />
              ) : (
                <span>Loading</span>
              )}
            </section>
            <section className="flex-col ml-12 mr-24 flex justify-center">
              <h2 className="font-medium pb-12 relative right-12 text-4xl text-white">
                Akan Datang
              </h2>
              {props.data?.upcoming ? (
                <MovieCarousel data={props.data.upcoming} />
              ) : (
                <span>Loading</span>
              )}
            </section>
            <section className="flex-col ml-12 mr-24 flex justify-center">
              <h2 className="font-medium pb-12 relative right-12 text-4xl text-white">
                Top Rated
              </h2>
              {props.data?.topRated ? (
                <MovieCarousel data={props.data.topRated} />
              ) : (
                <span>Loading</span>
              )}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
