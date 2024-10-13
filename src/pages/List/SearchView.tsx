import MovieCover from "@/components/MovieCover";
import PaginationComponent from "@/components/PaginationComponent";
import { Search } from "@/types/Search";
import { SetURLSearchParams } from "react-router-dom";

interface SelfProps {
  searchString: string;
  data: Search | undefined;
  currentPage: number;
  pageHandler: SetURLSearchParams;
}

export default function SearchView(props: SelfProps) {
  return (
    <div className="flex flex-col p-8">
      <section className="">
        <h2 className="font-bold pb-12 text-4xl">
          Hasil Pencarian Film: {props.searchString}
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-6">
            {props.data ? (
              props.data.results.map((item, index) => {
                return (
                  <MovieCover
                    to={"/movie/" + item.id}
                    key={index}
                    title={item.title}
                    description={item.overview}
                    img={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                    growOnHover
                  />
                );
              })
            ) : (
              <span>Loading</span>
            )}
          </div>
        </div>
        <div className="float-end mr-8 pt-6">
          <PaginationComponent
            current={props.currentPage}
            max={props.data?.total_pages}
            steps={3}
            pageHandler={props.pageHandler}
          />
        </div>
      </section>
    </div>
  );
}
