import React from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
  console.log(data);
  return (
    <div className="w-full pt-5 px-5 overflow-y-hidden flex flex-col justify-between gap-4">
      <h1 className="text-2xl text-zinc-200 mb-2">Trending</h1>
      <div className="w-full h-full overflow-x-auto flex gap-2">
        {data.map((d, i) => (
          <Link key={i} className="w-[16%] bg-zinc-800/[.3] hover:bg-zinc-600/[.3] transition-all duration-[.3s] flex-shrink-0 rounded p-4">
            <div className="w-[100%] aspect-square overflow-hidden rounded">
                <img className="h-full w-full object-cover" src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.profile_path}`} alt="" />
            </div>
            <h1 className="text-sm my-2">{d.title || d.original_title || d.original_name || d.name }</h1>
            <p className="text-xs my-2 text-zinc-400">{d.overview.slice(0,50)} ... <Link className="text-blue-400 font-semibold">more</Link>{" "}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
