import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import Header from "./components/header";
import { initKakao } from "kakao-js-sdk";
import { BrowserRouter, Route, Link, Routes, Navigate } from "react-router-dom";
import NewCupon from "./components/NewCupon";
initKakao("e9bb892f4d1bcdfa5c97ce52080ffceb");

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newCoupon" element={<NewCupon />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
