import { useState, useEffect } from 'react';
import tmdbApi from '../api/tmdbApi';

export const useMovies = (type, page) => {
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const params = { page };

        const getMovies = async () => {
            setIsFetching(true);
            try {
                const res = await tmdbApi.getMoviesList(type, { params });
                setMovies(res?.results);
                setTotalPages(res?.total_pages);
            } catch (err) {
                console.log('Error: ', err);
            } finally {
                setIsFetching(false);
            }
        };

        getMovies();
    }, [type, page]);

    return { movies, totalPages, isFetching };
};
