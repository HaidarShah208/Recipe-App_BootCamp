import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/Store";
import { useParams } from "react-router-dom";
import Cards from "../../components/Cards";
import { fetchMeals } from "../../redux/MealSlice";
import { searchRecipes } from "../../redux/SearchSlice";
import Loader from "../../components/Loader";
import { IMEGES } from "../../constant/AllAssets";
import { Meal } from "../../types/types";

const SearchRecipes: React.FC = () => {
  const { searchQuery } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const mealArray: Meal[] = useSelector(
    (state: RootState) => state.meals.meals
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchValue, setSearchValue] = useState("");

  const searchResults: Meal[] = useSelector(
    (state: RootState) => state.mealSearch.searchResults || []
  );

  const loading = useSelector((state: RootState) => state.meals.loading);

  const cleanupSearch = () => {
    dispatch(searchRecipes(""));
  };

  useEffect(() => {
    dispatch(fetchMeals());
    if (searchQuery) {
      dispatch(searchRecipes(searchQuery));
    } else {
      dispatch(searchRecipes(""));
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      dispatch(searchRecipes(""));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      dispatch(searchRecipes(""));
    } else {
      dispatch(searchRecipes(searchValue));
    }
    const matchingProducts = mealArray.filter((item) =>
      item.strMeal.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (matchingProducts.length > 0) {
      alert(`${searchValue} founded in recipes ! `);
    }
  };

  return (
    <div className="container mx-auto flex flex-col justify-center  py-16 text-center px-8 min-h-[90vh]">
      <div className="grid grid-cols-1">
        <h1 className="text-center ps-0 text-4xl mt-10 mb-8 font-bold">
          Search Recipes
        </h1>
        <div className="items-center mx-auto bg-slate-200 rounded-full  flex lg:w-[758px] sm:w-[334px] h-[64px]">
          <img src={IMEGES.Search} alt="search-icon" className="px-3" />
          <form onSubmit={handleSubmit}>
            <input
              className="bg-transparent w-full  focus:outline-none"
              type="text"
              placeholder="Search meals"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <button type="submit"></button>
          </form>
        </div>
      </div>
      <h1 className=" text-left justify-start ps-0 text-4xl mt-[180px] mb-8 font-bold">
        Search Results
      </h1>
      <div className="grid grid-cols-1 text-center justify-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {searchResults.length > 0
          ? searchResults.map((item) => (
              <Cards
                key={item.idMeal}
                image={item.strMealThumb}
                titile={item.strMeal.slice(0, 24)}
                instriuctions={item.strInstructions.slice(0, 90)}
                recpieId={item.idMeal}
              />
            ))
          : mealArray
              .slice(0, 3)
              .map((item) => (
                <Cards
                  key={item.idMeal}
                  image={item.strMealThumb}
                  titile={item.strMeal.slice(0, 24)}
                  instriuctions={item.strInstructions.slice(0, 90)}
                  recpieId={item.idMeal}
                />
              ))}
      </div>
    </div>
  );
};

export default SearchRecipes;
