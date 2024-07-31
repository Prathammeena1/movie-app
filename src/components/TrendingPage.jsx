import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./partials/TopNav";
import DropDown from "./partials/DropDown";
import Loading from "./partials/Loading";
import axios from "./utils/axios";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const TrendingPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  useEffect(() => {
    document.title = "Movie App | Trending " + category.toUpperCase();
  }, [category]);

  const getHeaderData = async () => {
    try {
      const res = await axios.get(`/trending/${category}/${duration}`);
      const randomIndex = Math.floor(Math.random() * res.data.results.length);
      const randomData = res.data.results[randomIndex];
      setData(randomData);
    } catch (error) {
      console.error("Error fetching header data", error);
    }
  };

  const getTrendingData = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.error("Error fetching trending data", error);
    }
  };

  const refreshHandler = () => {
    if (trending.length === 0) {
      getTrendingData();
    } else {
      setpage(1);
      setTrending([]);
      getTrendingData();
    }
  };

  useEffect(() => {
    refreshHandler();
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
        <div className="w-full flex flex-col md:flex-row  md:items-center gap-2 px-[3%] bg-zinc-950 sticky top-0 z-10">
          <div className="flex gap-2 items-center mt-5 md:mt-0">
            <div onClick={() => navigate(-1)}>
              <i className="ri-arrow-left-s-line text-3xl cursor-pointer hover:text-[rgba(133,44,192,1)] duration-[.3s]"></i>
            </div>
            <h1 className="md:text-2xl text-xl font-semibold capitalize">
              Trending
            </h1>
            <h1 className="md:text-2xl text-xl font-semibold capitalize">
              {category}
            </h1>
          </div>
          <div>
            <TopNav />
          </div>
          <div className="flex gap-2 mb-5 md:mb-0">
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
        </div>

        <div className="h-full w-full p-2 overflow-hidden">
          <InfiniteScroll
            dataLength={trending.length}
            next={getTrendingData}
            hasMore={hasMore}
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
