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

interface SelfProps {
  data: Search;
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
                to={"/movie/" + item.id}
                title={item.title ? item.title : ""}
                description={item.overview}
                img={imgBaseUrlPoster + item.poster_path}
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
