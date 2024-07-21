import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import TrendingPage from "../components/TrendingPage";
import PopularPage from "../components/PopularPage";
import MoviePage from "../components/MoviePage";
import TvShowPage from "../components/TvShowPage";
import PeoplePage from "../components/PeoplePage";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<TrendingPage />} />
      <Route path="/popular" element={<PopularPage />} />
      <Route path="/movie" element={<MoviePage />} />
      <Route path="/tv" element={<TvShowPage />} />
      <Route path="/people" element={<PeoplePage />} />
    </Routes>
  );
};

export default MainRouter;
