import React, { useEffect, useState } from 'react'
import tmdbApi, { movieType, tvType } from '../../api/tmdbApi'
import './TitlesScrollSection.css'
import { TitleItem } from '../TitleItem/TitleItem'
import { Link } from 'react-router-dom'
import { Slider } from '../Slider/Slider'

export const TitlesScrollSection = ({ type, title, category }) => {
    const [upcomingTitles, setUpcomingTitles] = useState([]);

    useEffect(() => {
        const getOnTheAirMovies = async () => {
            const params = {
                page: 1,
            };

            if (category === 'movie') {
                setUpcomingTitles(await fetchAndSetUpcomingTitles(tmdbApi.getMoviesList, movieType[type], params));
            } else if (category === 'tv') {
                setUpcomingTitles(await fetchAndSetUpcomingTitles(tmdbApi.getTvList, tvType[type], params));
            }
        }

        getOnTheAirMovies()
    }, [])

    async function fetchAndSetUpcomingTitles(api, type, params) {
        try {
            const response = await api(type, { params });
            return response.results.slice(1, 10);
        } catch (error) {
            console.error("Error fetching upcoming titles:", error);
            return [];
        }
    }

    return (
        <>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <div className='mt-[30px]'>
                <Slider>
                    {upcomingTitles.map((movieItem, idx) => (
                        <Link to={`details/${category}/${movieItem.id}`}>
                            <TitleItem
                                key={idx}
                                poster={movieItem?.poster_path}
                                title={movieItem?.title ?? movieItem?.name}
                                rating={movieItem?.vote_average}
                                releaseDate={movieItem?.release_date ?? movieItem?.first_air_date}
                            />
                        </Link>
                    ))}
                </Slider>
            </div>
        </>
    )
}