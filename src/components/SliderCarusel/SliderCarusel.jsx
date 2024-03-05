import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import tmdbApi, { movieType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

export const SliderCarusel = ({ sliderImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    let currentImage = apiConfig.originalImage(sliderImages[currentIndex]?.backdrop_path);
    let currentTitle = sliderImages[currentIndex]?.original_title;
    let currentOverview = sliderImages[currentIndex]?.overview;

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length);
    };

    return (
        <div className=' w-full h-[470px] lg:h-[550px] relative rounded-2xl group'>
            <div
                style={{ backgroundImage: `url(${currentImage})` }}
                className='w-full h-full rounded-2xl bg-center bg-cover duration-500 relative'
            >
                <div className="rounded-2xl flex flex-col justify-center w-full lg:w-[600px] p-6 lg:p-10 bg-black bg-opacity-50 text-white h-full">
                    <h2 className='text-4xl lg:text-7xl font-bold text-white duration-500'>{currentTitle}</h2>
                    <p className='text-l mt-9 duration-500'>{currentOverview}</p>
                    <button className='w-56 h-10 bg-transparent text-white border mt-9'>CHECK NOW</button>
                </div>
            </div>

            <div
                className='opacity-0 group-hover:opacity-100 absolute top-[50%] 
                translate-y-[50%] left-5 cursor-pointer transition-all-500 transition-opacity duration-500'
                onClick={() => handlePrev()}
            >
                <Icon icon="lucide:chevron-left" width="24" height="24" color='white' />
            </div>

            <div
                className='opacity-0 group-hover:opacity-100 absolute top-[50%] 
                translate-y-[50%] right-5 cursor-pointer transition-all-500 transition-opacity duration-500'
                onClick={() => handleNext()}
            >
                <Icon icon="lucide:chevron-right" width="24" height="24" color='white' />
            </div>

            <div className='hidden lg:flex items-center gap-1 absolute bottom-3 left-[50%] right-[50%]'>
                {sliderImages.map((item, idx) => (
                    <div className=''>
                        <Icon
                            key={idx}
                            icon="mdi:dot"
                            width={currentIndex === idx ? '32px' : '24px'}
                            height={currentIndex === idx ? '32px' : '24px'}
                            color='white'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

