import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, description,title }) => {
  return (
    <div className="flex flex-wrap w-full h-full gap-2 overflow-hidden">
      {data.map((d, i) => (
        <Link to={`/${d.media_type || title}/detail/${d.id}`}
          key={i}
          // to={`/details/${d.id}`} // Assuming you have a route for details page
          className=" relative md:w-[16%] w-[31%] md:h-[45vh] bg-zinc-800/[.5] hover:bg-zinc-600/[.7] transition-all duration-[.3s] flex-shrink-0 rounded md:p-4"
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
          <h1 className="md:text-lg my-2 text-sm">
            {(d.title && d.title.slice(0, 10)) ||
              (d.original_title && d.original_title.slice(0, 10)) ||
              (d.original_name && d.original_name.slice(0, 10)) ||
              (d.name && d.name.slice(0, 10))}
            ...
          </h1>
          {!description && d.overview && (
            <p className="text-xs my-2 text-zinc-400 hidden md:block">
              {d.overview.slice(0, 50)} ...{" "}
              <span className="text-zinc-300 font-semibold">more</span>
            </p>
          )}

          {d.vote_average && (
            <div className="bg-yellow-600 z-[9] md:text-xl w-[6vh] md:w-[9vh] aspect-square absolute right-[-3%] bottom-[25%] rounded-full flex items-center justify-center">
              {(d.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
