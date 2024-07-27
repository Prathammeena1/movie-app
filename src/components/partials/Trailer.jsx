import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const Trailer = () => {
  const {pathname} = useLocation();
  const ytVideo =useSelector(state => state.movie.info.videos)
  console.log(pathname,ytVideo)
  return (
    <div className='absolute top-0 left-0 w-full h-screen z-[100] flex items-center justify-center  bg-zinc-950/[.9]'>
      <ReactPlayer url={`https://www.youtube.com/watch?v=${ytVideo.key}`}/>
    </div>
  )
}

export default Trailer