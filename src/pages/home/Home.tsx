import React, { useEffect, useState } from "react";
import LargeCards from "../../components/LargeCards";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import Loader from "../../components/Loader";
import Cards from "../../components/Cards";
import { fetchMeals } from "../../redux/MealSlice";
import { searchRecipes } from "../../redux/SearchSlice";
import { useParams } from "react-router-dom";
import { Category, RecipeType, Recipes } from "../../types/types";
import { IMEGES } from "../../constant/AllAssets";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery } = useParams();
  const mealArray: Category[] = useSelector(
    (state: RootState) => state.meals.meals
  );
  const searchResults = useSelector(
    (state: RootState) => state.mealSearch.searchResults
  );
  const loading = useSelector((state: RootState) => state.meals.loading);
  const error = useSelector((state: RootState) => state.meals.error);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth >= 768);
  useEffect(() => {
    dispatch(fetchMeals());
    if (searchQuery) {
      dispatch(searchRecipes(searchQuery));
    }
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsLargeScreen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, searchQuery]);
  const sliceInstructions = (instructions: string): string => {
    if (windowWidth >= 1024) {
      return instructions.slice(0, 265);
    } else if (windowWidth >= 768) {
      return instructions.slice(0, 120);
    } else {
      return instructions.slice(0, 100);
    }
  };
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (fetchMeals == null) {
    return <div>Loading...</div>;
  }
  const existingRecipesString = localStorage.getItem("recipes") ?? "[]";
  const existingRecipes = JSON.parse(existingRecipesString);
  const lastThreeRecipes = existingRecipes.slice(-3);
  return (
    <div className="flex flex-col min-h-[90vh]">
      <div
        className="main relative bg-cover bg-center h-[709px] sm:h-[362px]"
        style={{ backgroundImage: `url(${IMEGES.MAIN})` }}
      >
        <h2 className="absolute inset-0 text-white flex items-center justify-center text-center text-yellow font-bold text-[40px] px-10 sm:w-full line-height-48 bg-black bg-opacity-50">
          Get Inspired, Cook with passion and enjoy <br /> unforgettable moments
          at the table
        </h2>
      </div>
      <div className="container mx-auto flex flex-col justify-center  py-16 text-center">
        <h1 className="col-span-12 sm:text-[38px] text-[32px] mb-14 font-bold ">
          Papulor Recipes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 px-3 ">
          {mealArray.slice(0, 3).map((item) => (
            <Cards
              key={item.idMeal}
              image={item.strMealThumb}
              titile={item.strMeal.slice(0, 24)}
              instriuctions={item.strInstructions.slice(0, 40)}
              recpieId={item.idMeal}/>
          ))}
        </div>
      </div>
      <div className="container mx-auto  flex flex-col items-center justify-center text-center gap-1 lg:w-3xl">
        <h1 className="col-span-12 text-[32px] sm:text-[38px]  font-bold pb-16">
          Recent Recipes
        </h1>
        {lastThreeRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8  px-3 rounded-s-2xl ">
            {lastThreeRecipes.map((recipiew: RecipeType, index: number) => (
              <LargeCards
                key={index}
                recpieId={recipiew.recpieId}
                image={recipiew.image}
                titile={recipiew.titile}
                instriuctions={recipiew.instriuctions}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 sm:mx-2">
            {mealArray.slice(10, 13).map((item) => (
              <LargeCards
                key={item.idMeal}
                recpieId={item.idMeal}
                image={item.strMealThumb}
                titile={
                  isLargeScreen ? item.strMeal.slice(0, 27) : item.strMeal
                }
                instriuctions={sliceInstructions(item.strInstructions)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
