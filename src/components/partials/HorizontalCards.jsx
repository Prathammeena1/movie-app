import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";

const HorizontalCards = ({ data }) => {
  
  return (
    <div className="w-full h-full overflow-x-auto mb-5 flex gap-2">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/detail/${d.id}`}
            key={i}
            // to={`/details/${d.id}`} // Assuming you have a route for details page
            className="md:w-[16%] w-[35%] overflow-hidden bg-zinc-800/[.3] hover:bg-zinc-600/[.3] transition-all duration-[.3s] flex-shrink-0 rounded md:p-4"
          >
            <div className="w-[100%] aspect-square overflow-hidden rounded">
              <img
                className="h-full w-full object-cover"
                src={
                  d.backdrop_path || d.profile_path || d.poster_path
                    ? `https://image.tmdb.org/t/p/original/${
                        d.backdrop_path || d.profile_path || d.poster_path
                      }`
                    : "https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg "
                }
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
              <p className="text-xs my-2 text-zinc-400 md:block hidden">
                {d.overview.slice(0, 50)} ...{" "}
                <span className="text-zinc-300 font-semibold">more</span>
              </p>
            )}
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-center mt-5 font-black ">No Data Available</h1>
      )}
    </div>
  );
};

export default HorizontalCards;
