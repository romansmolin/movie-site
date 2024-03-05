import React, { Suspense } from 'react'
import { Await, defer, useLoaderData, useSearchParams } from 'react-router-dom'
import { Grid as TopRatedMoviesGrid } from '../../layouts/Grid/Grid'
import tmdbApi, { movieType } from '../../api/tmdbApi'

import { useMovies } from '../../hooks/use-movies'


export const TopRatedMovies = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = parseInt(searchParams.get('page')) || 1;
	const { movies, totalPages, isFetching } = useMovies(movieType['top_rated'], currentPage)

	const onPageChange = (newPage) => {
		setSearchParams({ page: newPage });
	};

	return (
		<>
			<h2 className='text-3xl font-bold'>Top Rated Movies</h2>
			<TopRatedMoviesGrid
				data={movies}
				pages={totalPages}
				onPageChange={onPageChange}
				currentPage={currentPage}
				isFetching={isFetching}
			/>
		</>
	)
}

