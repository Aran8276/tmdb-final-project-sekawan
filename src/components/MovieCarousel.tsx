import { imgBaseUrl } from "@/Routes";
import { MovieResponse, Result } from "@/types/MovieTypes";
import MovieCover from "./MovieCover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

interface SelfProps {
  data: MovieResponse;
}

export default function MovieCarousel(props: SelfProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="w-[350px]">
        {props.data?.results.map((item, index) => {
          return (
            <CarouselItem className="">
              <MovieCover
                key={index}
                title={item.title ? item.title : ""}
                description={item.overview}
                img={imgBaseUrl + item.poster_path}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
