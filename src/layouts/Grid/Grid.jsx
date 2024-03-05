import React, { useState } from 'react'
import { TitleItem } from '../../components/TitleItem/TitleItem'

export const Grid = ({ data, pages, currentPage, onPageChange, isFetching }) => {

	return (
		<>
			<div className='grid 3xl:grid-cols-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-5 p-5 w-[95%] m-auto'>
				{data?.map((movie, index) => (
					<TitleItem
						key={`top-rated-movie-${index}`}
						poster={movie.poster_path}
						title={movie.title ?? movie.name}
						rating={movie.vote_average}
						releaseDate={movie.release_date ?? movie.first_air_date}
						isFetching={isFetching}
						currentPage={currentPage}
					/>
				))}
			</div>
			<PaginationButtons 
				totalPages={pages} 
				currentPage={currentPage} 
				onPageChange={onPageChange} 
			/>
		</>
	)
}

const PaginationButtons = ({ totalPages, currentPage, onPageChange }) => {
	const [pageRange, setPageRange] = useState([1, 5]); // Initial range of pages

	const handlePageChange = (page) => {
		onPageChange(page);
	
		// If the user clicks on the last page in the range, shift range forward
		if (page === pageRange[1]) {
			setPageRange([pageRange[0] + 5, Math.min(pageRange[1] + 5, totalPages)]);
		}
		// If the user clicks on the first page in the range, shift range backward
		else if (page === pageRange[0] && pageRange[0] > 1) {
			setPageRange([Math.max(1, pageRange[0] - 5), pageRange[0] - 1]);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	const renderPageButtons = () => {
		const buttons = [];
		for (let page = pageRange[0]; page <= Math.min(pageRange[1], totalPages); page++) {
			buttons.push(
				<button
					key={page}
					onClick={() => {
						scrollToTop()
						handlePageChange(page)
					}}
					className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
				>
					{page}
				</button>
			);
		}
		return buttons;
	};

	return (
		<div className="flex gap-2 justify-center items-center mx-auto">
			{renderPageButtons()}
		</div>
	);
}
