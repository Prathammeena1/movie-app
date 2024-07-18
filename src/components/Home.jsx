import React, { useEffect, useState } from "react";
import SideNav from "./partials/SideNav";
import TopNav from "./partials/TopNav";
import axios from "./utils/axios";
import Header from "./partials/Header";

const Home = () => {
  document.title = "Movie App | Home ";
  
  return (
    <>
      <SideNav />
      <div className="h-full w-[80%] bg-zinc-950/[.6] backdrop-blur-lg pt-10 text-white ">
      <TopNav/>
      <Header/>
      </div>
    </>
  );
};

export default Home;
