import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const TopNav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  


  const getSearch = async ()=>{
    const res = await axios.get(`/search/multi?query=${query}`);
    setsearches(res.data);
  }


  useEffect(()=>{
    getSearch();
  },[query])



  return (
    <div className="sticky top-0 z-[99] bg-zinc-950/[.6] backdrop-blur py-5 mx-auto flex px-8 items-center w-full justify-center">
      <i className="ri-search-line text-xl"></i>
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
          <div className="w-1/2 left-1/2 translate-x-[-50%] max-h-[45vh] bg-zinc-200 absolute z-[9] top-full flex flex-col gap-1 text-black rounded overflow-hidden overflow-y-auto ">
            {searches &&  searches.results.map((s,i) => <Link to={`/${s.media_type}/detail/${s.id}`} key={i} className="py-2 px-5 flex items-center gap-4 bg-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-all ease-linear duration-[.3s]">
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
