import { useState } from "react";
import Star from "./Star";
import { useDispatch } from "react-redux";
import { setIsRated, setRating } from "@/store/actions/detailAction";
import { toast } from "sonner";
import { sessionIdGetter } from "@/Routes";
import { useNavigate } from "react-router-dom";

interface SelfProps {
  maxRating: number;
  rating: number;
  isRatedByUser?: boolean;
  movieId: number;
  handleRating: (
    id: number | undefined,
    action: "add" | "delete",
    value?: number
  ) => void;
}

export default function Rating(props: SelfProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseClick = () => {
    props.handleRating(
      props.movieId,
      "add",
      hoveredIndex ? hoveredIndex + 1 : 0
    );
    dispatch(setRating(hoveredIndex ? hoveredIndex + 1 : 0));
    dispatch(setIsRated(true));
    toast.success("Film berhasil diulas!");
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-y-3 lg:gap-y-0 lg:gap-x-1">
      <div className="flex gap-1">
        {sessionIdGetter
          ? Array.from({ length: props.maxRating }, (_, index) => (
              <Star
                key={index}
                isEmpty={
                  index >=
                  (hoveredIndex !== null ? hoveredIndex + 1 : props.rating)
                }
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onMouseDown={handleMouseClick}
              />
            ))
          : Array.from({ length: props.maxRating }, (_, index) => (
              <Star
                key={index}
                isEmpty={
                  index >=
                  (hoveredIndex !== null ? hoveredIndex + 1 : props.rating)
                }
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onMouseDown={() => navigate("/login")}
              />
            ))}
      </div>
      <p className="ml-2 text-sm font-medium text-white">
        {props.isRatedByUser ? (
          <span>
            Anda menilai film ini: {props.rating} dari {props.maxRating}
          </span>
        ) : (
          <span>
            Dinilai {props.rating} dari {props.maxRating}
          </span>
        )}
      </p>
    </div>
  );
}
