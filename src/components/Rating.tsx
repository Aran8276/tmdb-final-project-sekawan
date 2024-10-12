import { useState } from "react";
import Star from "./Star";

interface SelfProps {
  maxRating: number;
  rating: number;
}

export default function Rating(props: SelfProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-x-1">
      {Array.from({ length: props.maxRating }, (_, index) => (
        <Star
          key={index}
          isEmpty={
            index >= (hoveredIndex !== null ? hoveredIndex + 1 : props.rating)
          }
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        />
      ))}
      <p className="ml-2 text-sm font-medium text-white">
        Dinilai {props.rating} dari {props.maxRating}
      </p>
    </div>
  );
}
