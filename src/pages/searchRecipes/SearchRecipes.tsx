import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/Store";
import { useNavigate, useParams } from "react-router-dom";
import Cards from "../../components/Cards";
import { fetchMeals } from "../../redux/MealSlice";
import { searchRecipes } from "../../redux/SearchSlice";
import Loader from "../../components/Loader";

import { IMEGES } from "../../constant/AllAssests";

const AllReceitas: React.FC = () => {
  const { searchQuery } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const mealArray = useSelector((state: RootState) => state.meals.meals);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const searchResults = useSelector(
    (state: RootState) => state.mealSearch.searchResults
  );
  
  const loading = useSelector((state: RootState) => state.meals.loading);

  const cleanupSearch = () => {
    dispatch(searchRecipes(""));
  };

  useEffect(() => {
    dispatch(fetchMeals());
    if (searchQuery) {
      dispatch(searchRecipes(searchQuery));
    } 

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, searchQuery]);

  if (loading) {
    return <Loader />;
  }

  const handleSearch = (searchQuery: string) => {
    dispatch(searchRecipes(searchQuery));
  };

  

  return (
    <div className="container mx-auto flex flex-col justify-center  py-16 text-center px-8">
      <div className="grid grid-cols-1">
        <h1 className="text-center ps-0 text-4xl mt-10 mb-8 font-bold">
          Search Recipes
        </h1>
        <div className="items-center mx-auto bg-slate-200 rounded-full justify-center flex lg:w-[758px] sm:w-[334px] h-[64px]">
          <img src={IMEGES.Search} alt="search-icon" className="px-3"/>
          <input
            className="bg-transparent w-full  focus:outline-none"
            type="text"
            placeholder="Search meals"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <h1 className=" text-left justify-start ps-0 text-4xl mt-[180px] mb-8 font-bold">
        Search Results
      </h1>
      <div className="grid grid-cols-1 text-center justify-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {searchResults.length > 0
          ? searchResults.map((item:any) => (
              <Cards
                key={item.idMeal}
                image={item.strMealThumb}
                titile={item.strMeal.slice(0, 24)}
                instriuctions={item.strInstructions.slice(0, 100)}
                recpieId={item.idMeal}
              />
            ))
          : mealArray.slice(0, 3).map((item) => (
              <Cards
                key={item.idMeal}
                image={item.strMealThumb}
                titile={item.strMeal.slice(0, 24)}
                instriuctions={item.strInstructions.slice(0, 100)}
                recpieId={item.idMeal}
              />
            ))}
      </div>
    </div>
  );
};

export default AllReceitas;
