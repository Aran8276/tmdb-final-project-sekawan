import { Link } from "react-router-dom";
import { MovieCoverProps } from "./MovieCover";
import { Card, CardContent, CardTitle } from "./ui/card";
import { DialogClose } from "./ui/dialog";

interface SelfProps extends MovieCoverProps {
  isForSearch?: boolean;
}

export default function HorizontalMovieCard(props: SelfProps) {
  return (
    <>
      {props.isForSearch ? (
        <Link to={props.to}>
          <DialogClose className="text-left">
            <Card
              className={`py-4 ${
                props.isForSearch ? "h-[100px]" : "h-[225px]"
              } w-full ${
                props.growOnHover
                  ? "hover:scale-[1.05] transition-all cursor-pointer"
                  : ""
              }`}
            >
              <CardContent>
                <div className="flex space-x-8">
                  {props.isForSearch ? (
                    <></>
                  ) : (
                    <img
                      className="rounded-xl h-[190px]"
                      src={props.img}
                      alt={props.title}
                    />
                  )}
                  <div
                    className={`flex-col space-y-2 ${
                      props.isForSearch ? "pt-0" : "pt-4"
                    }`}
                  >
                    <CardTitle
                      className={`${
                        props.isForSearch ? "line-clamp-1" : "line-clamp-2"
                      }`}
                    >
                      {props.title}
                    </CardTitle>
                    <p
                      className={
                        props.isForSearch
                          ? "line-clamp-2 text-sm"
                          : "line-clamp-4"
                      }
                    >
                      {props.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogClose>
        </Link>
      ) : (
        <Link to={props.to}>
          <Card
            className={`py-4 ${
              props.isForSearch ? "h-[100px]" : "h-[225px]"
            } w-full ${
              props.growOnHover
                ? "hover:scale-[1.05] transition-all cursor-pointer"
                : ""
            }`}
          >
            <CardContent>
              <div className="flex space-x-8">
                {props.isForSearch ? (
                  <></>
                ) : (
                  <img
                    className="rounded-xl h-[190px]"
                    src={props.img}
                    alt={props.title}
                  />
                )}
                <div
                  className={`flex-col space-y-2 ${
                    props.isForSearch ? "pt-0" : "pt-4"
                  }`}
                >
                  <CardTitle
                    className={`${
                      props.isForSearch ? "line-clamp-1" : "line-clamp-2"
                    }`}
                  >
                    {props.title}
                  </CardTitle>
                  <p
                    className={
                      props.isForSearch
                        ? "line-clamp-2 text-sm"
                        : "line-clamp-4"
                    }
                  >
                    {props.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      )}
    </>
  );
}
