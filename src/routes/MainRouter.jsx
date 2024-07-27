import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import TrendingPage from "../components/TrendingPage";
import PopularPage from "../components/PopularPage";
import MoviePage from "../components/MoviePage";
import TvShowPage from "../components/TvShowPage";
import PeoplePage from "../components/PeoplePage";
import MovieDetail from "../components/MovieDetail";
import TvDetail from "../components/TvDetail";
import PersonDetail from "../components/PersonDetail";
import Trailer from "../components/partials/Trailer";
import NotFound from "../components/partials/NotFound";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<TrendingPage />} />
      <Route path="/popular" element={<PopularPage />} />
      <Route path="/movie" element={<MoviePage />} />
      <Route path="/movie/detail/:id" element={<MovieDetail />}>
        <Route path="/movie/detail/:id/trailer" element={<Trailer/>} />
      </Route>
      <Route path="/tv" element={<TvShowPage />}/ >
      <Route path="/tv/detail/:id" element={<TvDetail />} >
        <Route path="/tv/detail/:id/trailer" element={<Trailer/>} />
      </Route>
      <Route path="/person" element={<PeoplePage />} />
      <Route path="/person/detail/:id" element={<PersonDetail />} />
      <Route path="*" element={<NotFound />} />

    </Routes>


  );
};

export default MainRouter;
