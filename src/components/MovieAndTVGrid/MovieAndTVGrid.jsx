import React from 'react'
import { Link } from 'react-router-dom'

import TopRatedMoviePreview from '../../assets/img/movies.jpg'
import TopRatedTvSeriesPreview from '../../assets/img/tv-shows.jpg'

export const MovieAndTVGrid = () => {

  return (
    <div className='flex-1 flex-col justify-between hidden xl:flex'>
      <Link 
        to={{
          pathname: "/top-rated-mvoies",
          search: "?page=1"
        }}
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${TopRatedMoviePreview})` }}
        className='p-5 rounded-2xl w-full h-[49%] relative bg-center bg-cover cursor-pointer'
      >
        <h2 className='text-2xl text-white font-bold absolute bottom-5'>Top Rate Movies</h2>
      </Link>
      <Link
        to={{
          pathname: "/top-rated-tv-shows",
          search: "?page=1"
        }}
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${TopRatedTvSeriesPreview})` }}
        className='p-5 rounded-2xl w-full h-[49%] relative bg-center bg-cover cursor-pointer'
      >
        <h2 className='text-2xl text-white font-bold absolute bottom-5'>Top Rate TV Shows</h2>
      </Link>
    </div>
  )
}
