import MovieCover from "@/components/MovieCover";
import { apiKey, baseUrl, imgBaseUrl } from "@/Routes";
import { MovieResponse } from "@/types/MovieTypes";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [data, setData] = useState<MovieResponse>();

  const fetchData = async () => {
    try {
      const res = await axios.get(baseUrl + "/tv/popular?api_key=" + apiKey);
      setData(res.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data?.results);
  }, [data]);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-4">
        {data?.results.map((item, index) => {
          return (
            <MovieCover
              key={index}
              title={item.name}
              description={item.overview}
              img={imgBaseUrl + item.poster_path}
            />
          );
        })}
      </div>
    </div>
  );
}
