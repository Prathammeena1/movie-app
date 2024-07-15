import React from 'react'

const SideNav = () => {
  return (
    <div className='h-full w-[20%] bg-zinc-950/[.8] backdrop-blur-lg pt-5 px-8'>
        <div className='flex gap-2 items-center font-semibold' >
            <img className='h-10' src="/svg/logo.svg" alt="" />
            <span className='text-2xl'>Movie App</span>
        </div>
        <div className='mt-5'>
            <h1 className='text-lg font-semibold'>New Feeds</h1>
            <div className='mt-3 ml-6 text-base font-medium text-zinc-400 flex flex-col'>
                <h3 className='py-1'>Trending</h3>
                <h3 className='py-1'>Trending</h3>
                <h3 className='py-1'>Trending</h3>
            </div>
        </div>
    </div>
  )
}

export default SideNav