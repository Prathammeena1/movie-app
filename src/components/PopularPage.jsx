import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./partials/TopNav";
import DropDown from "./partials/DropDown";
import Loading from "./partials/Loading";
import axios from "./utils/axios";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const PopularPage = () => {
  const navigate = useNavigate();


const [data, setData] = useState(null);
const [popular, setpopular] = useState([]);
const [category, setCategory] = useState("movie");
const [page, setpage] = useState(1);
const [hasMore, sethasMore] = useState(true);
useEffect(() => {
    document.title = "Movie App | Popular " + category.toUpperCase();
  }, [category]);

  const getHeaderData = async () => {
    try {
      const res = await axios.get(`/${category}/popular?page=1`);
      const randomIndex = Math.floor(Math.random() * res.data.results.length);
      const randomData = res.data.results[randomIndex];
      setData(randomData);
    } catch (error) {
      console.error("Error fetching header data", error);
    }
  };

  const getPopularData = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.error("Error fetching popular data", error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopularData();
    } else {
      setpage(1);
      setpopular([]);
      getPopularData();
    }
  };

  useEffect(() => {
    refreshHandler();
    getHeaderData();
  }, [category]);

  return data && popular.length > 0 ? (
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
          <h1 className="text-2xl font-semibold capitalize">Popular</h1>
          <h1 className="text-2xl font-semibold capitalize">{category}</h1>
          <TopNav />
          <DropDown
            title="Filter"
            options={["tv", "movie"]}
            func={(e) => setCategory(e.target.value.toLowerCase())}
          />
        </div>

        <div className="h-full w-full p-2 overflow-hidden">
          <InfiniteScroll
            dataLength={popular.length}
            next={getPopularData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <Cards data={popular} />
          </InfiniteScroll>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PopularPage;
