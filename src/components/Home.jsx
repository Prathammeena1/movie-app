import React, { useEffect, useState } from "react";
import SideNav from "./partials/SideNav";
import TopNav from "./partials/TopNav";
import axios from "./utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";

const Home = () => {
  document.title = "Movie App | Home ";


  const [data, setdata] = useState("");
  const style = {
    background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path}) `,
    backgroundPosition: "center",
    backgroundSize: "cover",
  }

  const getHeaderdata = async () => {
    const res = await axios.get(`/trending/all/day`);
    const random = (Math.random() * 19).toFixed();
    console.log(res.data.results);
    const x = res.data.results[random];
    setdata(x);
  };

  useEffect(() => {
    !data && getHeaderdata();
  }, []);



  return data && (
    <div style={style} className="flex h-full w-full" >
      <SideNav />
      <div className=" w-[80%] bg-zinc-950/[.2] backdrop-blur-lg text-white overflow-auto ">
        <TopNav />
        <Header data={data} />
        <HorizontalCards />
      </div>
    </div>
  );
};

export default Home;
