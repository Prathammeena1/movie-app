import React, { useEffect, useState } from "react";
import SideNav from "./partials/SideNav";
import TopNav from "./partials/TopNav";
import axios from "./utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import DropDown from "./partials/DropDown";
import Loading from "./partials/Loading";

const Home = () => {
  document.title = "Movie App | Home ";

  const [data, setdata] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const getHeaderdata = async () => {
    const res = await axios.get(`/trending/all/day`);
    const random = (Math.random() * 19).toFixed();
    const x = res.data.results[random];
    setdata(x);
  };
  const getTrendingData = async () => {
    const { data } = await axios.get(`/trending/${category}/day`);
    settrending(data.results);
  };

  useEffect(() => {
    getTrendingData();
    !data && getHeaderdata();
  }, [category]);


  return data && trending ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        }) `,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="flex h-full w-full"
    >
      <SideNav />
      <div className=" w-[80%] bg-zinc-950/[.2] backdrop-blur-lg text-white overflow-auto ">
        <TopNav />
        <Header data={data} />
        <div className="w-full pt-5 px-5 overflow-y-hidden flex flex-col justify-between gap-4">
          <div className="mb-2 flex w-full justify-between items-center">
            <h1 className="text-2xl text-zinc-200">Trending</h1>
            <DropDown
              title="Filter"
              options={["tv", "movie", "all"]}
              func={(e)=> setcategory(e.target.value.toLowerCase())}
            />
          </div>
          <HorizontalCards data={trending} />
        </div>
      </div>
    </div>
  ) : (
    <Loading/>
  );
};

export default Home;
