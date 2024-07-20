import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import TrendingPage from "../components/partials/TrendingPage";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<TrendingPage />} />
    </Routes>
  );
};

export default MainRouter;
