import { imgBaseUrl } from "@/Routes";
import MovieCover from "./MovieCover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Search } from "@/types/Search";
import GenreCover from "./GenreCover";
import { Genre } from "@/types/Genre";

interface SelfProps {
  data: Genre | undefined;
}

export default function GenreCarousel(props: SelfProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="w-[350px]">
        {props.data?.genres.map((item, index) => {
          return (
            <CarouselItem className="cursor-pointer">
              <GenreCover key={index} name={item.name} id={item.id} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
