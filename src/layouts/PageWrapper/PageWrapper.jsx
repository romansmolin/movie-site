import React from 'react'

export const PageWrapper = ({children}) => {
  return (
    <div className='flex flex-col space-y-4 pt-2 px-2 bg-zinc-100 flex-grow pb-4'>
      {children}
    </div>
  )
}
