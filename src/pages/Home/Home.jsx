import { SliderCarusel } from "../../components/SliderCarusel/SliderCarusel";
import { MovieAndTVGrid } from "../../components/MovieAndTVGrid/MovieAndTVGrid";
import { TitlesScrollSection } from "../../components/TitlesScrollSection/TitlesScrollSection.jsx";

import tmdbApi, { movieType } from "../../api/tmdbApi";
import { useLoaderData, defer, Await } from "react-router-dom";
import { Suspense } from "react";

const getPopular = async () => {
  const res = await tmdbApi.getMoviesList(movieType.popular, { page: 1 })
  return res
}

export async function loader() {
  return defer({
    popularMovies: getPopular()
  })
}

export const Home = () => {
  const { popularMovies } = useLoaderData()
  
  return (
    <>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={popularMovies}>
          {(resolvedMovies) => (
            <>
              <div className="flex w-full bg-white p-4 rounded-2xl gap-5">
                <SliderCarusel sliderImages={resolvedMovies?.results.slice(1, 5)} />
                {/* <MovieAndTVGrid /> */}
              </div>
              <TitlesScrollSection type={'upcoming'} title='New Movies Coming Soon' category="movie" />
              <TitlesScrollSection type={'on_the_air'} title='On The Air Tv Shows' category="tv" />
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};
