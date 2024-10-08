import { Card } from "./ui/card";

interface SelfProps {
  img: string;
  title: string;
  description: string;
}

export default function MovieCover(props: SelfProps) {
  return (
    <Card className="rounded-xl w-[265px] h-[530px]">
      <div className="flex flex-col">
        <figure>
          <img className="rounded-t-xl" src={props.img} alt={props.title} />
        </figure>
        <div className="p-4">
          <h2 className="font-bold text-xl">{props.title}</h2>
          <p className="line-clamp-3">{props.description}</p>
        </div>
      </div>
    </Card>
  );
}
