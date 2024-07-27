import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytVideo = useSelector((state) => state[category].info.videos);
  console.log(category, ytVideo);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[100] flex items-center justify-center  bg-zinc-950/[.9]">
      <div onClick={() => navigate(-1)}>
        <i className="ri-close-line absolute z-[99] top-[5%] right-[5%] text-4xl cursor-pointer hover:scale-[.9] hover:text-[rgba(133,44,192,1)] duration-[.3s]"></i>
      </div>

      {ytVideo ? (
        <ReactPlayer
          height={"80%"}
          width={"70%"}
          url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
