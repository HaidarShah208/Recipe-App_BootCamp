import React, { useEffect, useState } from "react";
import LargeCards from "../../components/LargeCards";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { fetchRecipe } from "../../redux/Slice";
import Loader from "../../components/Loader";
import Cards from "../../components/Cards";
import { fetchMeals } from "../../redux/mealSlice";
import { searchRecipes } from "../../redux/SearchSlice";

import { useParams } from "react-router-dom";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery } = useParams();
  const mealArray = useSelector((state: RootState) => state.meals.meals);

  const searchResults = useSelector(
    (state: RootState) => state.mealFetch.searchResults);
  const loading = useSelector((state: RootState) => state.meals.loading);
  const error = useSelector((state: RootState) => state.meals.error);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth >= 768
  );

  useEffect(() => {
    dispatch(fetchRecipe());
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
  // console.log("Search Results:", searchResults);

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
    return <div>Error: {error}</div>;
  }
  if (fetchMeals == null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className="main relative bg-cover bg-center h-[362px]"
        style={{
          lineHeight: "48px",
          backgroundImage:
            "url('https://img.freepik.com/premium-vector/chicken-dish-top-view-with-wooden-pattern-background-chicken-meat-collection-chicken-food-template_761765-41.jpg')",
        }}
      >
        <h2 className="absolute inset-0 text-white flex items-center justify-center text-center text-yellow font-bold md:text-3xl sm:text-sm " style={{backgroundColor:'rgba(0, 0, 0, 0.6)'}}>
          Get Inspired, Cook with passion and enjoy <br /> unforgettable moments
          at the table
        </h2>
      </div>

      <div className="container mx-auto flex flex-col justify-center  py-16 text-center">
      <h1 className="col-span-12 text-2xl mb-14 font-bold">
        {searchResults.length > 0
          ? "Search Results"
          : "Receitas mais procuradas"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 ">
        {searchResults.length > 0 ? (
          searchResults.slice(0, 3).map((item) => (
            <Cards
              key={item.idCategory}
              image={item.strCategoryThumb}
              titile={item.strCategory.slice(0, 24)}
              instriuctions={item.strCategoryDescription.slice(0, 100)}
              recpieId={item.idCategory}
            />
          ))
        ) : (
          mealArray
            .slice(0, 3)
            .map((item) => (
              <Cards
                key={item.idCategory}
                image={item.strCategoryThumb}
                titile={item.strCategory.slice(0, 24)}
                instriuctions={item.strCategoryDescription.slice(0, 100)}
                recpieId={item.idCategory}
              />
            ))
        )}
      </div>
    </div>
      <div className="container mx-auto flex flex-col text-center justify-center px-3 gap-1" style={{ maxWidth: windowWidth < 768 ? '380px' : '100%' }}>
        <h1 className="col-span-12 text-2xl font-bold pb-16">
          Receitas recentes
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 sm:mx-2 rounded-s-2xl">
          {mealArray.slice(10, 13).map((item) => (
            <LargeCards
              key={item.idCategory}
              recpieId={item.idCategory} // Ensure unique keys for each card
              image={item.strCategoryThumb} // Assuming image is a property of each item
              titile={
                isLargeScreen ? item.strCategory.slice(0, 27) : item.strCategory
              }
              instriuctions={sliceInstructions(item.strCategoryDescription)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
