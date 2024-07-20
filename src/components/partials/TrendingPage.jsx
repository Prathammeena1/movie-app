import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import DropDown from "./DropDown";
import Loading from "./Loading";
import axios from "../utils/axios";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const TrendingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Movie App | Home";
  }, []);

  const [data, setData] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [page, setpage] = useState(1);

  const getHeaderData = async () => {
    try {
      const res = await axios.get(`/trending/all/day`);
      const randomIndex = Math.floor(Math.random() * res.data.results.length);
      const randomData = res.data.results[randomIndex];
      setData(randomData);
    } catch (error) {
      console.error("Error fetching header data", error);
    }
  };

  const getTrendingData = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}`);
      setTrending((prevState) => [...prevState, ...data.results]);
      setpage(page+1)
    } catch (error) {
      console.error("Error fetching trending data", error);
    }
  };

  useEffect(() => {
    getTrendingData();
    getHeaderData();
  }, [category, duration]);

  return data && trending.length > 0 ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-screen text-zinc-200"
    >
      <div className="h-full relative w-full bg-zinc-950/[.6] backdrop-blur">
        <div className="w-full flex items-center gap-2 px-[3%] bg-zinc-950 sticky top-0">
          <div onClick={() => navigate(-1)}>
            <i className="ri-arrow-left-s-line text-3xl cursor-pointer hover:text-[rgba(133,44,192,1)] duration-[.3s]"></i>
          </div>
          <h1 className="text-2xl font-semibold">Trending</h1>
          <TopNav />
          <DropDown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value.toLowerCase())}
          />
          <div className="w-[.5%]"></div>
          <DropDown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value.toLowerCase())}
          />
        </div>

        <div className="h-full w-full p-2 overflow-hidden">
          <InfiniteScroll
            dataLength={trending.length}
            next={getTrendingData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <Cards data={trending} title={category} />
          </InfiniteScroll>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default TrendingPage;
