import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import TrendingPage from "../components/TrendingPage";
import PopularPage from "../components/PopularPage";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<TrendingPage />} />
      <Route path="/popular" element={<PopularPage />} />
    </Routes>
  );
};

export default MainRouter;
