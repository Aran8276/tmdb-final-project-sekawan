import GenreCarousel from "@/components/GenreCarousel";
import MovieCover from "@/components/MovieCover";
import PaginationComponent from "@/components/PaginationComponent";
import { Genre } from "@/types/Genre";
import { Search } from "@/types/Search";
import { SetURLSearchParams } from "react-router-dom";

interface SelfProps {
  genres: Genre | undefined;
  data: Search | undefined;
  currentPage: number;
  pageHandler: SetURLSearchParams;
}

export default function ListView(props: SelfProps) {
  return (
    <div className="flex flex-col space-y-16 px-8 pb-8 pt-32">
      <section>
        <div className="flex justify-center mx-24">
          <GenreCarousel data={props.genres} />
        </div>
      </section>
      <section>
        {/* <h2 className="font-bold pb-12 text-4xl">
          Daftar Semua Film (Sortir Trending: {weekdays[new Date().getDay()]})
        </h2> */}
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
            // Walaupun ditemukan 1000 halaman: "Invalid page: Pages start at 1 and max at 500. They are expected to be an integer."
            max={500}
            steps={3}
            pageHandler={props.pageHandler}
          />
        </div>
      </section>
    </div>
  );
}
