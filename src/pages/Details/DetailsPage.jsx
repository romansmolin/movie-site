import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import tmdbApi from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import { CoverImageSkeleton } from '../../layouts/Skeletons/Skeletons'
import { Slider } from '../../components/Slider/Slider'

const getDetails = async (cat, id) => {
	const res = await tmdbApi.detail(cat, id)
	return res
}

const getCast = async (cat, id) => {
	const res = await tmdbApi.credits(cat, id)
	return res
}

const getTrailer = async (cat, id) => {
	const res = await tmdbApi.getVideos(cat, id)
	return res
}

export async function loader({ params }) {
	const { cat, id } = params

	const data = Promise.all([getDetails(cat, id), getCast(cat, id), getTrailer(cat, id)]);

	return defer({ data })
}

export const DetailsPage = () => {
	const { data } = useLoaderData()

	return (
		<Suspense fallback={<h2>Loading...</h2>}>
			<Await resolve={data}>
				{([resolvedDetails, resolvedCast, resolvedVideos]) => (
					<Details
						resolvedDetails={resolvedDetails}
						resolvedCast={resolvedCast}
						resolvedVideos={resolvedVideos}
					/>)}
			</Await>
		</Suspense>
	)
}


const Details = ({ resolvedDetails, resolvedCast, resolvedVideos }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<div
			className='flex flex-col w-full bg-white p-4 rounded-2xl bg-center bg-cover bg-opacity-0'
			style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${apiConfig.originalImage(resolvedDetails?.backdrop_path)})` }}
		>
			<div className='flex w-full gap-6'>
				<div className='w-[30%] h-[750px] rounded-2xl'>
					{isLoading && <CoverImageSkeleton />}
					<img
						src={apiConfig.originalImage(resolvedDetails?.poster_path)}
						alt={resolvedDetails?.title}
						className={`w-full h-full rounded-2xl bg-cover bg-center object-cover ${imageLoaded ? 'opacity-1' : 'opacity-0'}`}
						onLoad={() => {
							setIsLoading(false)
							setImageLoaded(true)
						}}
					/>
				</div>
				<div className='w-[70%] space-y-4'>
					<div>
						<h1 className='text-5xl font-bold text-white'>
							{resolvedDetails?.title}
						</h1>
						<h2 className='uppercase font-bold text-white mt-2'>{resolvedDetails?.tagline}</h2>
					</div>
					<div className='flex gap-2 text-l text-white'>
						<span>{resolvedDetails?.vote_average}</span> |
						<span>{resolvedDetails?.runtime}m</span> |
						<span>{resolvedDetails?.release_date?.replace(/-/g, ".")}</span> |
					</div>
					<div className='flex gap-3'>
						{resolvedDetails?.genres?.map(genre => (
							<span className='badge whitespace-nowrap mb-2 inline-block text-sm bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-100 py-1 px-3 rounded-md transition-all'>{genre.name}</span>
						))}
					</div>
					<div className='flex flex-col font-semibold gap-4 text-white'>
						<h3 className='uppercase text-xl font-bold'>Overview:</h3>
						<p>{resolvedDetails?.overview}</p>
					</div>

					<div className='w-full mt-10'>
						<h3 className='uppercase text-xl text-white font-bold'>Videos:</h3>

						<Slider>
							{resolvedVideos?.results.map(video => (
								<Video item={video} />
							))}
						</Slider>
					</div>
				</div>
			</div>

			<div className='w-full mt-10'>
				<h3 className='uppercase text-xl text-white font-bold'>Cast:</h3>
				<Slider>
					{resolvedCast.cast.map(member => (
						member.profile_path && (
							<div flex flex-col>
								<div className='w-[200px] h-[300px] flex-shrink-0'>
									<img
										src={apiConfig.originalImage(member.profile_path)}
										alt={member.original_name}
										className={`w-full h-full rounded-2xl object-cover ${imageLoaded ? 'opacity-1' : 'opacity-0'}`}
										onLoad={() => {
											setIsLoading(false)
											setImageLoaded(true)
										}}
									/>
								</div>
								<span className='text-sm text-white'> Character: {member.character}</span>
								<br />
								<span className='text-sm text-white'>Actor: {member.original_name}</span>
							</div>
						)
					))}
				</Slider>
			</div>
		</div>
	)
}

const Video = ({ item }) => {
	const iframeRef = useRef(null)

	useEffect(() => {
		const height = iframeRef.current.offsetWidth * 9 / 16 + 'px'
		iframeRef.current.setAttribute('height', height)
	}, [])

	return (
		<div className=''>
			<iframe
				src={`https://www.youtube.com/embed/${item.key}`}
				ref={iframeRef}
				title='video'
				width='700px'
			>
			</iframe>
		</div>
	)
}


