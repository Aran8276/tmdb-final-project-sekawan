import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import GenreCover from "./GenreCover";
import { Genre } from "@/types/Genre";
import { Link } from "react-router-dom";

interface SelfProps {
  data: Genre | undefined;
}

export default function GenreCarousel(props: SelfProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="w-[350px]">
        {props.data?.genres.map((item, index) => {
          return (
            <Link key={index} to={`/list/genre/${item.id}`}>
              <CarouselItem className="w-[348px] cursor-pointer">
                <GenreCover name={item.name} id={item.id} />
              </CarouselItem>
            </Link>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
