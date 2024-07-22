import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./partials/TopNav";
import DropDown from "./partials/DropDown";
import Loading from "./partials/Loading";
import axios from "./utils/axios";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const MoviePage = () => {
  const navigate = useNavigate();


const [data, setData] = useState(null);
const [movie, setmovie] = useState([]);
const [category, setCategory] = useState("now_playing");
const [page, setpage] = useState(1);
const [hasMore, sethasMore] = useState(true);
useEffect(() => {
    document.title = "Movie App | Movie " + category.toUpperCase().split('_').join(" ");
  }, [category]);

  const getHeaderData = async () => {
    try {
      const res = await axios.get(`/movie/${category}?page=1`);
      const randomIndex = Math.floor(Math.random() * res.data.results.length);
      const randomData = res.data.results[randomIndex];
      setData(randomData);
    } catch (error) {
      console.error("Error fetching header data", error);
    }
  };

  const getMovieData = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setmovie((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movie data", error);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      getMovieData();
    } else {
      setpage(1);
      setmovie([]);
      getMovieData();
    }
  };

  useEffect(() => {
    refreshHandler();
    getHeaderData();
  }, [category]);

  return data && movie.length > 0 ? (
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
        <div className="w-full flex items-center gap-2 px-[3%] bg-zinc-950 sticky top-0 z-10">
          <div onClick={() => navigate(-1)}>
            <i className="ri-arrow-left-s-line text-3xl cursor-pointer hover:text-[rgba(133,44,192,1)] duration-[.3s]"></i>
          </div>
          <h1 className="text-2xl font-semibold capitalize">movie</h1>
          <h1 className="text-2xl font-semibold capitalize h-fit w-[14vw]">{category.split('_').join(" ")}</h1>
          <TopNav />
          <DropDown
            title="Filter"
            options={['now_playing','popular','top_rated','upcoming']}
            func={(e) => setCategory(e.target.value.toLowerCase())}
          />
        </div>

        <div className="h-full w-full p-2 overflow-hidden">
          <InfiniteScroll
            dataLength={movie.length}
            next={getMovieData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <Cards data={movie} title='movie' />
          </InfiniteScroll>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MoviePage;
