import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, description }) => {
  console.log(data);
  return (
    <div className="flex flex-wrap w-full h-full gap-2 overflow-hidden">
      {data.map((d, i) => (
        <Link
          key={i}
          // to={`/details/${d.id}`} // Assuming you have a route for details page
          className=" relative w-[16%] h-[45vh] bg-zinc-800/[.5] hover:bg-zinc-600/[.7] transition-all duration-[.3s] flex-shrink-0 rounded p-4"
        >
          <div
            className={
              !description
                ? "w-[100%] shadow-lg aspect-square overflow-hidden rounded"
                : "w-[100%] shadow-lg aspect-[4/5] overflow-hidden rounded"
            }
          >
            <img
              className="h-full w-full object-cover"
              src={
                d.profile_path || d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.profile_path || d.backdrop_path || d.poster_path
                    }`
                  : "https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg "
              }
              alt=""
            />
          </div>
          <h1 className="text-lg my-2">
            {(d.title && d.title.slice(0, 10)) ||
              (d.original_title && d.original_title.slice(0, 10)) ||
              (d.original_name && d.original_name.slice(0, 10)) ||
              (d.name && d.name.slice(0, 10))}
            ...
          </h1>
          {!description && d.overview && (
            <p className="text-xs my-2 text-zinc-400">
              {d.overview.slice(0, 50)} ...{" "}
              <span className="text-zinc-300 font-semibold">more</span>
            </p>
          )}

          {d.vote_average && (
            <div className="bg-yellow-600 z-[9] text-xl w-[9vh] aspect-square absolute right-[-3%] bottom-[25%] rounded-full flex items-center justify-center">
              {(d.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
