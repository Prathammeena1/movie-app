import React, { useEffect, useState } from "react";
import SideNav from "./partials/SideNav";
import TopNav from "./partials/TopNav";
import axios from "./utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";

const Home = () => {
  document.title = "Movie App | Home ";


  const [data, setdata] = useState(null);
  const [trending, settrending] = useState(null);
  
  const getHeaderdata = async () => {
    const res = await axios.get(`/trending/all/day`);
    const random = (Math.random() * 19).toFixed();
    const x = res.data.results[random];
    setdata(x);
  };
  const getTrendingData = async () => {
    const {data} = await axios.get(`/trending/all/day`);
    settrending(data.results);
  };
  
  useEffect(() => {
    !data && getHeaderdata();
    !trending && getTrendingData();
  }, []);
  


  return data && trending  ? (
    <div style={{
      background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path}) `,
      backgroundPosition: "center",
      backgroundSize: "cover",
    }} className="flex h-full w-full" >
      <SideNav />
      <div className=" w-[80%] bg-zinc-950/[.2] backdrop-blur-lg text-white overflow-auto ">
        <TopNav />
        <Header data={data} />
        <HorizontalCards data={trending} />
      </div>
    </div>
  ):''
};

export default Home;
