import React from 'react'
import SideNav from './SideNav'

const Home = () => {
    document.title = 'Movie App | Home '
  return (
    <div className='h-full w-full flex '>
        <SideNav/>
        
    </div>
  )
}

export default Home