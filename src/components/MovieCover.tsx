import { Link } from "react-router-dom";
import { Card } from "./ui/card";

export interface MovieCoverProps {
  img: string;
  title: string;
  description: string;
  growOnHover?: boolean;
  to: string;
}

export default function MovieCover(props: MovieCoverProps) {
  return (
    <Link to={props.to}>
      <Card
        className={`rounded-xl ${
          props.growOnHover
            ? "hover:scale-[1.05] transition-all cursor-pointer"
            : ""
        } w-[265px] h-[530px]`}
      >
        <div className="flex flex-col">
          <figure>
            <img className="rounded-t-xl" src={props.img} alt={props.title} />
          </figure>
          <div className="p-4">
            <h2 className="font-bold text-xl line-clamp-1">{props.title}</h2>
            <p className="line-clamp-3">{props.description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
