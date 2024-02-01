import React, { useEffect, useState } from 'react'
import tmdbApi, { movieType } from '../../../api/tmdbApi'
import apiConfig from '../../../api/apiConfig'

const temp = [
    {
        name: 'Naruto 1',
        descr: 'Brbbrbrb'
    },
    {
        name: 'Naruto 2',
        descr: 'Brbbrbrb'
    },
    {
        name: 'Naruto 3',
        descr: 'Brbbrbrb'
    },
    {
        name: 'Naruto 4',
        descr: 'Brbbrbrb'
    },
    {
        name: 'Naruto 5',
        descr: 'Brbbrbrb'
    },
    {
        name: 'Naruto 6',
        descr: 'Brbbrbrb'
    }
]

export const OnTheAirMovieList = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
        const getOnTheAirMovies = async () => {
            const params = {
                page: 1,
            };

            const response = await tmdbApi.getMoviesList(movieType['upcoming'], { params })
            setUpcomingMovies(response.results.slice(1, 8))
        }

        getOnTheAirMovies()
    }, [])

    return (
        <>
            <h2>Coming soon to cinemas</h2>
            <div className='flex justify-between w-full overflow-x-scroll'>
                {upcomingMovies.map((movieItem, idx) => (
                    <UpcomingMovieItem 
                        poster={movieItem?.poster_path}
                        title={movieItem?.title}
                        rating={movieItem?.vote_average}
                        releaseDate={movieItem?.release_date}
                    />
                ))}
            </div>
        </>
    )
}

const UpcomingMovieItem = ({ poster, title, rating, releaseDate }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{ 
                backgroundImage: `url(${apiConfig.originalImage(poster)})`,
                position: 'relative' 
            }}
            className='h-[500px] w-[300px] rounded-2xl border bg-cover bg-center flex-shrink-0'
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