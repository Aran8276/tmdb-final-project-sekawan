import { imgBaseUrlPoster } from "@/Routes";
import MovieCover from "./MovieCover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Search } from "@/types/Search";
import { delay, motion } from "framer-motion";

interface SelfProps {
  data: Search;
}

const variants = {
  hidden: { opacity: 0, y: -400 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

export default function MovieCarousel(props: SelfProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="w-[350px]">
        {props.data?.results.map((item, index) => {
          return (
            <motion.div
              initial="hidden"
              viewport={{ once: true }}
              whileInView="visible"
              variants={variants}
              className="px-4"
            >
              <CarouselItem className="">
                <MovieCover
                  key={index}
                  to={"/movie/" + item.id}
                  title={item.title ? item.title : ""}
                  description={item.overview}
                  img={imgBaseUrlPoster + item.poster_path}
                />
              </CarouselItem>
            </motion.div>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
