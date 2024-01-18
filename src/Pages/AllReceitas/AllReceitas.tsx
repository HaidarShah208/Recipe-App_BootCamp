import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipe } from "../../redux/Slice";
import { RootState, AppDispatch } from "../../redux/Store";
import { useParams } from "react-router-dom";
import Cards from "../../components/Cards";
import { fetchMeals } from "../../redux/MealSlice";
import { searchRecipes } from "../../redux/SearchSlice";
import Loader from "../../components/Loader";
import { AiOutlineSearch } from "react-icons/ai";

const AllReceitas: React.FC = () => {
  const { recpieId } = useParams();
  const { searchQuery } = useParams();

  // console.log("recpieId", recpieId);
  const dispatch = useDispatch<AppDispatch>();
  const mealArray = useSelector((state: RootState) => state.meals.meals);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const searchResults = useSelector(
    (state: RootState) => state.mealFetch.searchResults
  );
  const loading = useSelector((state: RootState) => state.meals.loading);

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
    console.log("handleSearch called with query:", searchQuery);
    dispatch(searchRecipes(searchQuery) as any);
  };

  return (
    <div className="container mx-auto flex flex-col justify-center  py-16 text-center px-8">
      <div className="grid grid-cols-1">
      <h1 className="text-center ps-0 text-2xl mt-10 mb-8 font-bold">
        Search Recipies
</h1>
        <div className="items-center mx-auto bg-slate-200 rounded-full justify-center flex lg:w-[768px] sm:w-[334px] h-[54px]">
          <AiOutlineSearch size={20} className="mx-2" />
          <input
            className="bg-transparent w-full  focus:outline-none"
            type="text"
            placeholder="Search meals"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <h1 className=" text-left justify-start ps-0 text-2xl mt-14 mb-8 font-bold">
        {searchResults.length > 0
          ? "Search Results"
          : "Receitas mais procuradas"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <Cards
              key={item.idMeal}
              image={item.strMealThumb}
              titile={item.strMeal.slice(0, 24)}
              instriuctions={item.strInstructions.slice(0, 100)}
              recpieId={item.idMeal}
            />
          ))
        ) : (
          <div className="flex flex-center text-center"> record NOt Found</div>
        )}
      </div>
    </div>
  );
};

export default AllReceitas;
