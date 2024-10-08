import { Card } from "./ui/card";

interface SelfProps {
  img: string;
  title: string;
  description: string;
}

export default function MovieCover(props: SelfProps) {
  return (
    <Card className="w-[300px] h-[600px]">
      <div className="flex flex-col">
        <figure>
          <img src={props.img} alt={props.title} />
        </figure>
        <h2 className="font-bold text-xl">{props.title}</h2>
        <p className="line-clamp-3">{props.description}</p>
      </div>
    </Card>
  );
}
