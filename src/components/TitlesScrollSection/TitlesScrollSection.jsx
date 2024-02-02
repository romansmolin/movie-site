import React, { useEffect, useState, useRef } from 'react'
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import './TitlesScrollSection.css'

export const TitlesScrollSection = ({ type, title, category }) => {
    const [upcomingTitles, setUpcomingTitles] = useState([]);

    useEffect(() => {
        const getOnTheAirMovies = async () => {
            const params = {
                page: 1,
            };

            if (category === 'movies') {
                setUpcomingTitles(await fetchAndSetUpcomingTitles(tmdbApi.getMoviesList, movieType[type], params));
            } else if (category === 'tv-series') {
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
            <h2 className='text-2xl font-bold  '>{title}</h2>
            <div className='relative mt-[30px]'>
                <div className='flex rounded-2xl gap-2 w-full overflow-x-scroll shady-transition h-auto custom-scroll' style={{ padding: '10px' }}>
                    {upcomingTitles.map((movieItem, idx) => (
                        <UpcomingTitleItem
                            poster={movieItem?.poster_path}
                            title={movieItem?.title ?? movieItem?.name}
                            rating={movieItem?.vote_average}
                            releaseDate={movieItem?.release_date ?? movieItem?.first_air_date}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

const UpcomingTitleItem = ({ poster, title, rating, releaseDate }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                backgroundImage: `url(${apiConfig.originalImage(poster)})`,
                position: 'relative'
            }}
            className='h-[400px] 2sm:h-[333px] w-[250px] rounded-2xl border bg-cover bg-center flex-shrink-0 cursor-pointer'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <div className='z-10 relative bg-black bg-opacity-50 rounded-2xl h-[100%] p-6'>
                    <p className='text-white uppercase font-bold text-2xl text-center'>{title}</p>
                    <p className='text-white uppercase font-bold text-2xl text-center'>{releaseDate}</p>
                </div>
            )}
        </div>
    );
}