import { Link } from "react-router-dom";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";

const Header = ({data}) => {
  

  return (
    data && (
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
            data.backdrop_path || data.profile_path
          }) `,
          backgroundPosition: "top",
          backgroundSize: "cover",
        }}
        className="h-[70vh] w-full backdrop-blur-lg"
      >
        <div className="h-full w-[70%] bg-gradient-to-r from-black/[.5] to-transparent flex flex-col justify-end px-[5%] py-[3%]  ">
          <h1 className="text-4xl text-white font-bold uppercase tracking-widest w-[80%]">
            {data.original_name ||
              data.name ||
              data.original_title ||
              data.title}
          </h1>
          {data.overview && (
            <p className="text-sm text-zinc-400 leading-4 my-4 w-[80%]">
              {data.overview.slice(0, 200)}...{" "}
              <Link to={`/${data.media_type}/detail/${data.id}`} className="text-blue-400 font-semibold">more</Link>{" "}
            </p>
          )}
          <p className="space-x-4 capitalize text-xl text-zinc-300 font-medium">
            {data.release_date && (
              <i className="ri-megaphone-fill text-[rgba(133,44,192,1)]"></i>
            )}{" "}
            {data.release_date}
            {data.media_type && (
              <i className="ri-album-fill text-[rgba(133,44,192,1)]"></i>
            )}{" "}
            {data.media_type}
          </p>
          <Link to={`/${data.media_type}/detail/${data.id}/trailer`} className="px-5 py-2 bg-[rgba(133,44,192,1)] w-fit rounded font-medium my-4 hover:bg-[rgba(133,44,192,.7)] transition-all duration-[.3s]">Watch Trailer</Link>
        </div>
      </div>
    )
  );
};

export default Header;
