import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SideNav = () => {

    const closeRef = useRef(null)

    useGSAP(()=>{

        const currentClose = closeRef.current;
        if (currentClose) {
          currentClose.addEventListener('click', ()=>{
            gsap.to('.sideNav',{
                left: '-100%'
                })
          });
        }
    })


  return (
    <div className='sideNav h-full w-[80%] z-[9] md:w-[20%] md:relative md:left-[0%] bg-zinc-950/[.6] backdrop-blur-lg pt-5 px-8 text-white capitalize border-r border-zinc-600 absolute left-[-100%]'>

        <i ref={closeRef} class="ri-close-line md:hidden absolute top-[1%] right-[5%] scale-[1.5]"></i>
        <div className='flex gap-2 items-center font-semibold' >
            <img className='h-7' src="/svg/logo.svg" alt="" />
            <span className='text-2xl'>Movie App</span>
        </div>
        <div className='mt-7'>
            <h1 className='text-xl font-semibold'>New Feeds</h1>
            <div className='mt-4 ml-2 text-base font-medium text-zinc-400 flex flex-col gap-1'>
                <Link to='/trending'><h3 className='p-3 rounded text-lg hover:bg-zinc-300 hover:text-zinc-900 transition-all ease-linear duration-[.3s] '> <i className="ri-fire-fill mr-1"></i> Trending</h3></Link>
                <Link to='/popular'><h3 className='p-3 rounded text-lg hover:bg-zinc-300 hover:text-zinc-900 transition-all ease-linear duration-[.3s] '> <i className="ri-bard-fill mr-1"></i> Popular</h3></Link>
                <Link to='/movie'><h3 className='p-3 rounded text-lg hover:bg-zinc-300 hover:text-zinc-900 transition-all ease-linear duration-[.3s] '> <i className="ri-movie-2-fill mr-1"></i> Movie</h3></Link>
                <Link to='/tv'><h3 className='p-3 rounded text-lg hover:bg-zinc-300 hover:text-zinc-900 transition-all ease-linear duration-[.3s] '> <i className="ri-tv-2-fill mr-1"></i> Tv Shows</h3></Link>
                <Link to='/person' ><h3 className='p-3 rounded text-lg hover:bg-zinc-300 hover:text-zinc-900 transition-all ease-linear duration-[.3s] '> <i className="ri-team-fill mr-1"></i> People</h3></Link>
            </div>
        </div>
        <hr className='outline-none border-zinc-600 my-4' />
        <div className='mt-7'>
            <h1 className='text-lg font-semibold'>Website Information</h1>
            <div className='mt-4 ml-2 text-base font-medium text-zinc-400 flex flex-col gap-1'>
                <Link><h3 className='p-3 rounded text-lg hover:bg-zinc-300 hover:text-zinc-900 transition-all ease-linear duration-[.3s] '> <i className="ri-information-fill mr-1"></i> About</h3></Link>
                <Link><h3 className='p-3 rounded text-lg hover:bg-zinc-300 hover:text-zinc-900 transition-all ease-linear duration-[.3s] '> <i className="ri-phone-fill mr-1"></i> Contact Us</h3></Link>
            </div>
        </div>
    </div>
  )
}

export default SideNav