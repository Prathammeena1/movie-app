import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import DropDown from "./DropDown";
import Loading from "./Loading";
import axios from "../utils/axios";
import Cards from "./Cards";

const TrendingPage = () => {
  const navigate = useNavigate();



  document.title = "Movie App | Home ";

  const [data, setdata] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");

  const getHeaderdata = async () => {
    const res = await axios.get(`/trending/all/day`);
    const random = (Math.random() * 19).toFixed();
    const x = res.data.results[random];
    setdata(x);
  };
  const getTrendingData = async () => {
    const { data } = await axios.get(`/trending/${category}/${duration}`);
    settrending(data.results);
  };

  useEffect(() => {
    getTrendingData();
    !data && getHeaderdata();
  }, [category,duration]);



  return data && trending ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        }) `,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className=" w-screen h-screen text-zinc-200 overflow-hidden"
    >

      <div className="h-full w-full bg-zinc-950/[.6] backdrop-blur overflow-y-auto">

      <div className="w-full flex items-center gap-2 px-[3%] bg-zinc-950 fixed top-0">
        <div onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-s-line text-3xl cursor-pointer hover:text-[rgba(133,44,192,1)] duration-[.3s] "></i>
        </div>
        <h1 className="text-2xl font-semibold">Trending</h1>
        <TopNav />
        <DropDown
          title="Filter"
          options={["tv", "movie", "all"]}
            func={(e)=> setcategory(e.target.value.toLowerCase())}
        />
        <div className="w-[.5%]"></div>
        <DropDown
          title="Duration"
          options={["week", "day"]}
            func={(e)=> setduration(e.target.value.toLowerCase())}
        />
      </div>

      <div className="h-full w-full pt-24">
        <Cards data={trending} title={category} />

      </div>


      </div>

      
    </div>
  ): (
    <Loading/>
  );
};

export default TrendingPage;
