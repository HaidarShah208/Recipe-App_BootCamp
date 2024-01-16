import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Store from "./pages/sotore/Stores";
import Receitas from "./pages/receitas/Receitas";
import AllReceitas from "./pages/allReceitas/AllReceitas";

const Routese: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/recite/:recpieId" element={<Receitas />} />
      <Route path="/recite" element={<AllReceitas />} />
    </Routes>
  );
};

export default Routese;
