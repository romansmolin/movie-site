import { useEffect, useState } from "react";
import { SliderCarusel } from "../../components/SliderCarusel/SliderCarusel";
import { MovieAndTVGrid } from "../../components/MovieAndTVGrid/MovieAndTVGrid";
import { OnTheAirMovieList } from "../../components/OnTheAirMovieList/OnTheAirMovieList/OnTheAirMovieList";

import tmdbApi, { movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

export const Home = () => {
  const [sliderData, setSliderData] = useState([]);
  const [topRatedGridItems, setTopRatedGridItems] = useState([]);

  useEffect(() => {
    const getPopularMovies = async () => {
      const params = {
        page: 1,
      };

      let response = await tmdbApi.getMoviesList(movieType.popular, { params });
      setSliderData(response.results.slice(1, 4));
    };

    getPopularMovies();
  }, []);

  return (
    <>
      <div className="flex w-full bg-white p-4 rounded-2xl gap-5">
        <SliderCarusel sliderImages={sliderData} />
        <MovieAndTVGrid />
      </div>
      <OnTheAirMovieList />
    </>
  );
};
