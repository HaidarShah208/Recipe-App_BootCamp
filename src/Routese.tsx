import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Store from './Pages/Sotore/Stores';
import Receitas from './Pages/Receitas/Receitas';
import AllReceitas from './Pages/AllReceitas/AllReceitas';
// import Prac from './Pages/Prac/Prac';
 

const Routese: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/store' element={<Store />} />
      <Route path='/recite/:recpieId' element={<Receitas />} />
      <Route path='/recite' element={<AllReceitas />} />
      {/* <Route path='/prac' element={<Prac />} /> */}

      {/* <Route path='/data' element={<RecipeComponent />} /> */}
    </Routes>
  );
}

export default Routese;
