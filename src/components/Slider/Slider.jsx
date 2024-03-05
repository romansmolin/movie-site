import React from 'react'

export const Slider = ({children}) => {
    return (
        <div className='flex rounded-2xl gap-2 w-full overflow-x-scroll overflow-y-hidden shady-transition custom-scroll ' style={{ padding: '10px' }}>
            {children}
        </div>            
    ) 
}

