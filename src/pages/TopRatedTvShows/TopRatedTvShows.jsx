import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Grid as TopRatedTvShowsGrid } from '../../layouts/Grid/Grid'
import tmdbApi, { tvType } from '../../api/tmdbApi'

import { useTvShows } from '../../hooks/use-tv-shows'

export const TopRatedTvShows = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const { tvShows, totalPages, isFetching } = useTvShows(tvType['top_rated'], currentPage);

  const onPageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <>
      <h2 className='text-3xl font-bold'>Top Rated Tv Shows</h2>
      <TopRatedTvShowsGrid
        data={tvShows}
        pages={totalPages}
        onPageChange={onPageChange}
        currentPage={currentPage}
        isFetching={isFetching}
      />
    </>
  )
}

