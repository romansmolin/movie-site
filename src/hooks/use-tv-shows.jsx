import { useState, useEffect } from 'react'
import tmdbApi from '../api/tmdbApi'

export const useTvShows = (type, page) => {
    const [tvShows, setTvShows] = useState([])
    const [totalPages, setTotalPages] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        const params = { page }

        const getTvShows = async () => {
            setIsFetching(true)
            try {
                const res = await tmdbApi.getTvList(type, { params })
                setTvShows(res?.results)
                setTotalPages(res?.total_pages)
            } catch (err) {
                console.log('Error: ', err)
            } finally {
                setIsFetching(false)
            }
        }

        getTvShows()
    }, [type, page])

    return { tvShows, totalPages, isFetching};
}