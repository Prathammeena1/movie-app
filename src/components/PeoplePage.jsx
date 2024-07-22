import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./partials/TopNav";
import Loading from "./partials/Loading";
import axios from "./utils/axios";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const PeoplePage = () => {
  const navigate = useNavigate();


const [data, setData] = useState(null);
const [person, setperson] = useState([]);
const [category, setCategory] = useState("popular");
const [page, setpage] = useState(1);
const [hasMore, sethasMore] = useState(true);
useEffect(() => {
    document.title = "Movie App | People ";
  }, [category]);

  const getHeaderData = async () => {
    try {
      const res = await axios.get(`/person/${category}?page=1`);
      const randomIndex = Math.floor(Math.random() * res.data.results.length);
      const randomData = res.data.results[randomIndex];
      setData(randomData);
    } catch (error) {
      console.error("Error fetching header data", error);
    }
  };

  const getpersonData = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setperson((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.error("Error fetching person data", error);
    }
  };

  const refreshHandler = () => {
    if (person.length === 0) {
      getpersonData();
    } else {
      setpage(1);
      setperson([]);
      getpersonData();
    }
  };

  useEffect(() => {
    refreshHandler();
    getHeaderData();
  }, [category]);

  return data && person.length > 0 ? (
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
          <h1 className="text-2xl font-semibold capitalize w-[10vw]">People</h1>
          <TopNav />
        </div>

        <div className="h-full w-full p-2 overflow-hidden">
          <InfiniteScroll
            dataLength={person.length}
            next={getpersonData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <Cards data={person} description={true} title='person' />
          </InfiniteScroll>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PeoplePage;
