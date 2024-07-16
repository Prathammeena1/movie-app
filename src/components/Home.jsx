import React from "react";
import SideNav from "./partials/SideNav";
import TopNav from "./partials/TopNav";

const Home = () => {
  document.title = "Movie App | Home ";
  return (
    <>
      <SideNav />
      <div className="h-full w-[80%] bg-zinc-950/[.6] backdrop-blur-lg pt-10 px-8 text-white ">
      <TopNav/>
      </div>
    </>
  );
};

export default Home;
