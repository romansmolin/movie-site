import React, { useState, useEffect } from 'react';
import apiConfig from '../../api/apiConfig';
import { CoverImageSkeleton } from '../../layouts/Skeletons/Skeletons';

export const TitleItem = ({ poster, title, rating, releaseDate }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const imageUrl = apiConfig.originalImage(poster);


    return (
        <div className='flex flex-col w-[250px]'>
            <div
                className='h-[350px] w-full rounded-2xl border bg-cover bg-center flex-shrink-0 cursor-pointer'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {isLoading && <CoverImageSkeleton />}
                <div className='relative h-full w-full rounded-2xl bg-cover bg-center'>
                    <img
                        src={imageUrl}
                        alt="Title"
                        className={`w-full h-full rounded-2xl bg-cover bg-center object-cover ${imageLoaded ? 'opacity-1' : 'opacity-0'}`}
                        onLoad={() => {
                            setIsLoading(false)
                            setImageLoaded(true)
                        }}
                    />
                    {isHovered && (
                        <div className='z-10 absolute w-full top-0 left-0 bg-black bg-opacity-50 rounded-2xl h-full p-6'>
                            <p className='text-white uppercase font-bold text-2xl text-center'>{title}</p>
                            <p className='text-white uppercase font-bold text-2xl text-center'>{releaseDate}</p>
                        </div>
                    )}
                </div>
            </div>
            {imageLoaded && (
                <>
                    <h2 className='font-bold text-xl whitespace-nowrap overflow-hidden text-ellipsis'>{title}</h2>
                    <div className='flex justify-between'>
                        <span>Ratig: {rating}</span>
                    </div>
                </>
            )}
        </div>
    );
};
