import { useGSAP } from "@gsap/react";
import axios from "../utils/axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

const TopNav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  


  const getSearch = async ()=>{
    const res = await axios.get(`/search/multi?query=${query}`);
    setsearches(res.data);
  }

  const openRef = useRef(null)


  useGSAP(()=>{

    const currentOpen = openRef.current;
    if (currentOpen) {
      currentOpen.addEventListener('click', ()=>{
        gsap.to('.sideNav',{
            left: '0%'
            })
      });
    }
})




  useEffect(()=>{
    getSearch();
  },[query])



  return (
    <div className="sticky top-[-1px] z-[99] bg-zinc-950/[.6] backdrop-blur py-5 mx-auto flex px-8 items-center w-full justify-center">
      <i ref={openRef} className="ri-menu-2-line absolute text-xl left-[5%]"></i>
      <i className="ri-search-line text-xl ml-10 md:ml-0"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        type="text"
        placeholder="Search Here..."
        className="bg-transparent outline-none ml-10 mr-4 text-xl w-[50%]"
      />
      {query.trim() !== "" && (
        <>
          <i onClick={() => setquery("")} className="ri-close-large-line cursor-pointer"></i>{" "}
          <div className="md:w-1/2 left-1/2 w-[90%] translate-x-[-50%] max-h-[45vh] bg-zinc-700 absolute z-[9] top-full flex flex-col gap-[1px] text-black rounded overflow-hidden overflow-y-auto ">
            {searches &&  searches.results.map((s,i) => <Link to={`/${s.media_type}/detail/${s.id}`} key={i} className="py-2 px-5 flex items-center gap-4 bg-zinc-800 hover:bg-zinc-800/[.6] text-zinc-200 transition-all ease-linear duration-[.3s]">
              <img
                className="h-10 w-10 object-cover rounded"
                src={ s.profile_path || s.backdrop_path ? `https://image.tmdb.org/t/p/original/${s.profile_path || s.backdrop_path}` : 'https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg '}
                alt=""
              />
              <h1 className="text-2xl capitalize">{s.original_name || s.name || s.original_title || s.title }</h1>
            </Link>) }
          </div>
        </>
      )}
    </div>
  );
};

export default TopNav;
