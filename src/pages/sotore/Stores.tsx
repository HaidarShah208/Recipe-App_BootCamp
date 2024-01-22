import React, { useEffect, useState } from "react";
import LargeCards from "../../components/LargeCards";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { Category, fetchMeals } from "../../redux/MealSlice";
import { searchRecipes } from "../../redux/SearchSlice";
import Loader from "../../components/Loader";

const Store: React.FC = () => {
  const { searchQuery } = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch<AppDispatch>();
  const mealArray: Category[] = useSelector(
    (state: RootState) => state.meals.meals
  );
  const searchResults = useSelector(
    (state: RootState) => state.mealFetch.searchResults
  );
  const loading = useSelector((state: RootState) => state.meals.loading);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    dispatch(fetchMeals());
    if (searchQuery) {
      dispatch(searchRecipes(searchQuery));
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, searchQuery]);

  if (loading) {
    return <Loader />;
  }

  const sliceInstructions = (instructions: string): string => {
    if (windowWidth >= 1024) {
      return instructions.slice(0, 265);
    } else if (windowWidth >= 768) {
      return instructions.slice(0, 120);
    } else {
      return instructions.slice(0, 100);
    }
  };
  return (
    <div
      className="container mx-auto flex flex-col text-center justify-center px-3"
      style={{ maxWidth: windowWidth < 768 ? "380px" : "100%" }}
    >
      <h1 className="col-span-12 text-2xl my-10 font-bold">
        {searchResults.length > 0
          ? "Search Results"
          : "Receitas mais procuradas"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 sm:mx-5 md:rounded-none lg:rounded-3xl">
        {searchResults.length > 0
          ? searchResults.map((item) => (
              <LargeCards
                key={item.idMeal}
                image={item.strMealThumb}
                titile={item.strMeal}
                instriuctions={sliceInstructions(item.strInstructions)}
                recpieId={item.idMeal}
              />
            ))
          : mealArray.map((item) => (
              <LargeCards
                key={item.idMeal}
                image={item.strMealThumb}
                titile={item.strMeal}
                instriuctions={sliceInstructions(item.strInstructions)}
                recpieId={item.idMeal}
              />
            ))}
      </div>
    </div>
  );
};

export default Store;
