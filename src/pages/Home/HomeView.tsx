import MovieCarousel from "@/components/MovieCarousel";
import { getTrailerSrcById } from "@/Routes";
import { HomeState } from "@/store/reducers/homeReducer";
import { Plus, Popcorn } from "lucide-react";
import { availabilityHandler } from "./Home";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface SelfProps {
  data: HomeState;
}

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.5 * i },
  }),
};

const child = {
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

export default function HomeView(props: SelfProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return props.data.video ? (
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
              <div className="h-fit overflow-hidden">
                <motion.h1
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  className="text-7xl font-semibold"
                >
                  {props.data.movie?.title.split("").map((letter, index) => (
                    <motion.span key={index} variants={child}>
                      {letter}
                    </motion.span>
                  ))}
                </motion.h1>
              </div>
              <motion.p
                className="w-[600px] font-light line-clamp-3"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                {props.data.movie?.overview}
              </motion.p>
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
  ) : (
    <div className="flex justify-center items-center scale-[4] h-screen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin")}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
}
