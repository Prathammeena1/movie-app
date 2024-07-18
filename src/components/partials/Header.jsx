import { Link } from "react-router-dom";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [data, setdata] = useState("");

  const getHeaderdata = async () => {
    const res = await axios.get(`/trending/all/day`);
    const random = (Math.random() * 19).toFixed();
    console.log(res.data.results);
    const x = res.data.results[random];
    setdata(x);
  };

  console.log(data);

  useEffect(() => {
    !data && getHeaderdata();
  }, []);

  return (
    data && (
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
            data.backdrop_path || data.profile_path
          }) `,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="h-[70vh] w-full mt-5 backdrop-blur-lg"
      >
        <div className="h-full w-[60%] bg-gradient-to-r from-black to-transparent flex flex-col justify-end p-[5%]  ">
            <h1 className="text-4xl text-white font-bold uppercase tracking-widest w-[80%]">
              {data.original_name || data.name || data.original_title || data.title }
            </h1>
          {data.overview && <p className="text-sm text-zinc-400 leading-4 my-4 w-[80%]">{data.overview.slice(0,200)}... <Link className="text-blue-400 font-semibold">more</Link> </p> } 
          <p className="space-x-4">
          {data.release_date && <i className="ri-megaphone-fill"></i> } {data.release_date}
          {data.media_type && <i className="ri-album-fill"></i> } {data.media_type}
          </p>
        </div>
      </div>
    )
  );
};

export default Header;
