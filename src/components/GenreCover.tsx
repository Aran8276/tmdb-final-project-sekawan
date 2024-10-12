import { GenreElement } from "@/types/Genre";
import { Card, CardTitle, CardContent } from "./ui/card";

// https://image.tmdb.org/t/p/w500/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg

export default function GenreCover(props: GenreElement) {
  return (
    <Card className="flex transition-transform scale-[0.94] hover:scale-100 items-end h-48 bg-contain bg-[url('/genre-bg.png')]">
      <CardContent>
        <CardTitle className="text-white bg-black bg-opacity-75 p-4 relative right-6 w-[330px]">
          {props.name}
        </CardTitle>
      </CardContent>
    </Card>
  );
}
