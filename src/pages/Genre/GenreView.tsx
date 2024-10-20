import MovieCover from "@/components/MovieCover";
import PaginationComponent from "@/components/PaginationComponent";
import { Button } from "@/components/ui/button";
import { GenreData } from "@/types/Genre";
import { Link, SetURLSearchParams } from "react-router-dom";

interface SelfProps {
  label: string;
  data: GenreData;
  pageHandler: SetURLSearchParams;
  currentPage: number;
  maxPage: number;
}

export default function GenreView(props: SelfProps) {
  return (
    <div className="flex flex-col pb-12 pt-32 space-y-12">
      <section className="flex justify-center">
        <div className="flex-col">
          <h2 className="font-bold pb-12 text-4xl">Kategori: {props.label}</h2>
          <div className="pb-6">
            <Link to="/list">
              <Button className="scale-[1.10]">Kembali ke Film</Button>
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {props.data?.results?.map((item, index) => {
              return (
                <MovieCover
                  to={"/movie/" + item.id}
                  key={index}
                  description={item.overview}
                  img={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                  title={item.title}
                  growOnHover
                />
              );
            })}
          </div>
          <div className="float-end mr-8 pt-6">
            <PaginationComponent
              pageHandler={props.pageHandler}
              current={props.currentPage}
              max={props.maxPage}
              steps={3}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
