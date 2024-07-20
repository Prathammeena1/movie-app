import React from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import DropDown from "./DropDown";

const TrendingPage = () => {
  const navigate = useNavigate();
  return (
    <div className=" p-[3%] w-screen h-screen text-zinc-200">
      <div className="w-full flex items-center gap-2">
        <div onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-s-line text-3xl cursor-pointer hover:text-[rgba(133,44,192,1)] duration-[.3s] "></i>
        </div>
        <h1 className="text-2xl font-semibold">Trending</h1>
        <TopNav />
        <DropDown
              title="Filter"
              options={["tv", "movie", "all"]}
            //   func={(e)=> setcategory(e.target.value.toLowerCase())}
        />
        <div className="w-[.5%]"></div>
        <DropDown
              title="Duration"
              options={["week", "day"]}
            //   func={(e)=> setcategory(e.target.value.toLowerCase())}
        />
      </div>
    </div>
  );
};

export default TrendingPage;
