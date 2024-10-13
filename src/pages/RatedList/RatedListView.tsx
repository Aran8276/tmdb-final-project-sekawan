import MovieCover from "@/components/MovieCover";
import PaginationComponent from "@/components/PaginationComponent";
import { Favorite } from "@/types/Favorite";
import { SetURLSearchParams } from "react-router-dom";

interface SelfProps {
  data: Favorite | undefined;
  currentPage: number;
  pageHandler: SetURLSearchParams;
  total_pages?: number;
}

export default function RatedListView(props: SelfProps) {
  return (
    <div className="flex flex-col p-8">
      <section>
        <h2 className="font-bold pb-12 text-4xl">Film Diulas</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-6">
            {props.data ? (
              props.data.results.length < 1 ? (
                <div className="mr-96 relative bottom-4 w-full">
                  <span>Belum ada film yang diulas.</span>
                </div>
              ) : (
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
              )
            ) : (
              <span>Loading</span>
            )}
          </div>
        </div>
        <div className="float-end mr-8 pt-6">
          <PaginationComponent
            noQuery
            current={props.currentPage}
            max={props.total_pages}
            steps={3}
            pageHandler={props.pageHandler}
          />
        </div>
      </section>
    </div>
  );
}
