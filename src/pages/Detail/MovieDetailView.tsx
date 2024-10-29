import Rating from "@/components/Rating";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Result } from "@/types/Video";
import { MovieDetailType } from "@/types/MovieDetail";
import { formatDate, imgBaseUrlFull, imgBaseUrlPoster } from "@/Routes";
import { Collection } from "@/types/Collection";
import { Similar } from "@/types/Similar";
import HorizontalMovieCard from "@/components/HorizontalMovieCard";
import { Link } from "react-router-dom";

interface SelfProps {
  isLoggedIn: boolean;
  data: MovieDetailType | undefined;
  video: Result[] | undefined;
  collection: Collection | undefined;
  similar: Similar | undefined;
  isFavorite: boolean;
  rating: number;
  isRated: boolean;
  handleDelete: (id: number) => void;
  handleFavorite: (id: number | undefined, action: "add" | "delete") => void;
  handleRating: (
    id: number | undefined,
    action: "add" | "delete",
    value?: number
  ) => void;
}

export default function MovieDetailView(props: SelfProps) {
  return (
    <div className="flex justify-center flex-col space-y-4 w-screen">
      <img
        src={imgBaseUrlFull + props.data?.backdrop_path}
        className="hidden lg:block object-cover absolute top-0 w-screen h-screen"
        alt={props.data?.title}
      />
      <section className="pb-12 pt-32 h-screen mx-24">
        <div className="container backdrop-blur-sm bg-none lg:bg-black rounded-xl lg:bg-opacity-50 scale-[1.10] flex flex-col px-6 py-4 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:space-x-12 lg:items-center">
          <img
            className="scale-[1.7] rounded-xl lg:hidden"
            src={imgBaseUrlFull + props.data?.backdrop_path}
            alt={props.data?.title}
          />
          <div className="hidden lg:flex items-center justify-center w-full h-96 lg:w-1/2">
            <Carousel className="scale-[0.87] w-[560px]">
              <CarouselContent>
                {props.video?.map((item, index) => {
                  return (
                    <CarouselItem key={index}>
                      <iframe
                        className="rounded-xl"
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${item.key}`}
                        title="YouTube video player"
                        allowFullScreen
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold text-white lg:text-4xl">
                {props.data?.title}
              </h2>
              <p className="mt-4 text-gray-300 text-sm">
                {props.data?.overview}
              </p>
              <div className="self-center pt-4">
                {props.isRated ? (
                  <Rating
                    handleRating={props.handleRating}
                    movieId={props.data ? props.data?.id : 0}
                    rating={Math.round(props.rating)}
                    isRatedByUser
                    maxRating={10}
                  />
                ) : (
                  <Rating
                    handleRating={props.handleRating}
                    movieId={props.data ? props.data?.id : 0}
                    rating={Math.round(
                      props.data?.vote_average ? props.data?.vote_average : 0
                    )}
                    maxRating={10}
                  />
                )}
              </div>
              <div className="flex flex-col mt-6 space-y-3 lg:space-x-3 lg:space-y-0 lg:flex-row">
                {props.isLoggedIn ? (
                  <>
                    {props.isFavorite ? (
                      <Button
                        onClick={() =>
                          props.handleFavorite(props.data?.id, "delete")
                        }
                        variant="destructive"
                      >
                        Hapus dari Favorit
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          props.handleFavorite(props.data?.id, "add")
                        }
                        variant="outline"
                      >
                        Tambah ke Favorit
                      </Button>
                    )}

                    {props.isRated ? (
                      <Button
                        onClick={() =>
                          props.handleDelete(props.data ? props.data.id : 0)
                        }
                        className="bg-yellow-600 hover:bg-yellow-500 transition-transform"
                      >
                        Hapus Rating
                      </Button>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <Link to="/login">
                    <Button
                      onClick={() =>
                        props.handleFavorite(props.data?.id, "delete")
                      }
                      variant="outline"
                    >
                      Login untuk tambahkan ke Favorit
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-[200px] lg:pt-0 lg:flex justify-center pb-12 mx-6 lg:mx-24">
        <Tabs defaultValue="detail" className="w-full">
          <TabsList
            className={`grid w-full ${
              props.data?.belongs_to_collection ? "grid-cols-3" : "grid-cols-2"
            }`}
          >
            <TabsTrigger value="detail">Detail Film</TabsTrigger>
            {props.data?.belongs_to_collection ? (
              <TabsTrigger value="collection">Koleksi Film</TabsTrigger>
            ) : (
              <></>
            )}
            <TabsTrigger value="similar">Film Serupa</TabsTrigger>
          </TabsList>
          <TabsContent value="detail">
            <div className="flex flex-col p-6 text-gray-500 dark:text-gray-200 bg-gray-100 dark:bg-neutral-900 rounded-lg text-lg shadow-md">
              <p>
                Tanggal Rilis:{" "}
                {props.data?.release_date
                  ? formatDate(props.data?.release_date.toString())
                  : ""}
              </p>
              <p>Durasi Film: {props.data?.runtime} menit</p>
              <p>
                Genre:{" "}
                {props.data?.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>Modal Budget: ${props.data?.budget.toLocaleString()} USD</p>
              <p>Penghasilan: ${props.data?.revenue.toLocaleString()} USD</p>
              <p>Rata-Rata Rating: {props.data?.vote_average}</p>
              <p>Jumlah Rating: {props.data?.vote_count}</p>
              <p>Status: {props.data?.status ? "Dirilis" : "Akan Datang"}</p>
              <p>Tagline: {props.data?.tagline}</p>
              <p>IMDB ID: {props.data?.imdb_id}</p>
              <p>
                Situs Website:{" "}
                <a href={props.data?.homepage} className="text-blue-500">
                  {props.data?.homepage}
                </a>
              </p>
              <p>
                Produser Perusahaan:{" "}
                {props.data?.production_companies
                  .map((company) => company.name)
                  .join(", ")}
              </p>
              <p>
                Negara Produksi:{" "}
                {props.data?.production_countries
                  .map((country) => country.name)
                  .join(", ")}
              </p>
              <p>
                Bahasa Tersedia:{" "}
                {props.data?.spoken_languages
                  .map((language) => language.name)
                  .join(", ")}
              </p>
              <p>Film Dewasa: {props.data?.adult ? "Iya" : "Tidak"}</p>
              <p>
                Koleksi:{" "}
                {props.data?.belongs_to_collection
                  ? props.data?.belongs_to_collection.name
                  : "None"}
              </p>
            </div>
          </TabsContent>
          <TabsContent value="collection">
            <div className="flex p-6 text-gray-500 dark:text-gray-200 bg-gray-100 dark:bg-neutral-900 rounded-lg text-lg shadow-md">
              <div className="flex space-x-12 w-full mx-4">
                <img
                  className="h-[400px] rounded-xl"
                  src={imgBaseUrlPoster + props.collection?.poster_path}
                  alt={props.collection?.name}
                />
                <div className="flex flex-col pt-4">
                  <h2 className="text-2xl font-bold">
                    {props.collection?.name}
                  </h2>
                  <p>{props.collection?.overview}</p>
                  <h3 className="text-xl pt-8 pb-3 text-gray-500">
                    Daftar Koleksi Film:
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {props.collection?.parts.map((item, index) => {
                      return (
                        <HorizontalMovieCard
                          key={index}
                          img={imgBaseUrlPoster + item.poster_path}
                          description={item.overview}
                          title={item.title}
                          to={`/movie/${item.id}`}
                          growOnHover
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="similar">
            <div className="grid grid-cols-1 p-12 gap-4 text-gray-500 dark:text-gray-200 bg-gray-100 dark:bg-neutral-900 rounded-lg text-lg shadow-md">
              {props.similar?.results.map((item, index) => {
                return (
                  <HorizontalMovieCard
                    title={item.title}
                    description={item.overview}
                    img={imgBaseUrlPoster + item.poster_path}
                    to={`/movie/${item.id}`}
                    key={index}
                    growOnHover
                  />
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </section>
      <div className=""></div>
    </div>
  );
}
