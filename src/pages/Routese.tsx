import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Store from "./store/Stores";
import Receitas from "./detailPage/DetailPage";
import AllReceitas from "./searchRecipes/SearchRecipes";
import PageNotFound from "../components/PageNotFound";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
export const Routese: React.FC = () => {
  return (
    <>
 <TopNavbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/recite/:recpieId" element={<Receitas />} />
      <Route path="/recite" element={<AllReceitas />} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    <Footer/>
    </>

  );
};

