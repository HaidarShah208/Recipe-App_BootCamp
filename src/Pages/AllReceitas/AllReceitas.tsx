import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipe } from "../../redux/Slice";
import { RootState, AppDispatch } from "../../redux/Store";
import { useParams } from "react-router-dom";
import Cards from "../../components/Cards";
import { fetchMeals, searchRecipes } from "../../redux/mealSlice";

const AllReceitas: React.FC = () => {
  const { recpieId } = useParams();
  const { searchQuery } = useParams();

  console.log("recpieId", recpieId);
  const dispatch = useDispatch<AppDispatch>();
  const mealArray = useSelector((state: RootState) => state.meals.meals);
  const searchResults = useSelector(
    (state: RootState) => state.meals.searchResults
  );
  const loading = useSelector((state: RootState) => state.spoonacular.loading);

  useEffect(() => {
    dispatch(fetchMeals());
    if (searchQuery) {
      dispatch(searchRecipes(searchQuery));
    }
  }, [dispatch,searchQuery]);

  return (
    <div className="container mx-auto flex flex-col justify-center items-center py-16 text-center ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        <h1 className="col-span-12 text-2xl mb-14 font-bold">
          {searchResults.length > 0 ? 'Search Results' : 'Receitas mais procuradas'}
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
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
  );
};

export default AllReceitas;
