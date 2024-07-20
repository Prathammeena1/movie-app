import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";

const HorizontalCards = ({ data,func }) => {


  return (
    
      <div className="w-full h-full overflow-x-auto mb-5 flex gap-2">
        {data.map((d, i) => (
          <Link
            key={i}
            // to={`/details/${d.id}`} // Assuming you have a route for details page
            className="w-[16%] h-[37vh] overflow-hidden bg-zinc-800/[.3] hover:bg-zinc-600/[.3] transition-all duration-[.3s] flex-shrink-0 rounded p-4"
          >
            <div className="w-[100%] aspect-square overflow-hidden rounded">
              <img
                className="h-full w-full object-cover"
                src={`https://image.tmdb.org/t/p/original/${
                  d.backdrop_path || d.profile_path
                }`}
                alt=""
              />
            </div>
            <h1 className="text-sm my-2">
              {(d.title && d.title.slice(0, 10)) ||
                (d.original_title && d.original_title.slice(0, 10)) ||
                (d.original_name && d.original_name.slice(0, 10)) ||
                (d.name && d.name.slice(0, 10))}
              ...
            </h1>
            {d.overview && (
              <p className="text-xs my-2 text-zinc-400">
                {d.overview.slice(0, 50)} ...{" "}
                <span className="text-zinc-300 font-semibold">more</span>
              </p>
            )}
          </Link>
        ))}
    </div>
  );
};

export default HorizontalCards;
