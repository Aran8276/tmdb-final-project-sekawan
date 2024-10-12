import { Link } from "react-router-dom";
import { MovieCoverProps } from "./MovieCover";
import { Card, CardContent, CardTitle } from "./ui/card";

export default function HorizontalMovieCard(props: MovieCoverProps) {
  return (
    <Link to={props.to}>
      <Card
        className={`py-4 h-[225px] w-full ${
          props.growOnHover
            ? "hover:scale-[1.05] transition-all cursor-pointer"
            : ""
        }`}
      >
        <CardContent>
          <div className="flex space-x-8">
            <img
              className="rounded-xl h-[190px]"
              src={props.img}
              alt={props.title}
            />
            <div className="flex-col space-y-2 pt-4">
              <CardTitle>{props.title}</CardTitle>
              <p className="line-clamp-4">{props.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
