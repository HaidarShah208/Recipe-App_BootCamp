import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/Store";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { fetchMeals } from "../../redux/MealSlice";

type Recipe = {
  idMeal: number;
  strMealThumb: string;
  strMeal: string;
  strInstructions: string;
};

type Category = {
  idMeal: number;
};

const Receitas: React.FC = () => {
  const { recpieId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const mealArray = useSelector((state: RootState) => state.meals.meals);

  const searchResults = useSelector(
    (state: RootState) => state.mealFetch.searchResults
  );
  const loading = useSelector((state: RootState) => state.meals.loading);
  const error = useSelector((state: RootState) => state.meals.error);
  const [recipieData, setRecipieData] = useState<Recipe | null>(null);
  const listStyle: React.CSSProperties = {
    listStyleType: 'disc', 
  };


  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  useEffect(() => {
    const matchRecipieId = mealArray.find(
      (recipies: Category) => recipies.idMeal.toString() === recpieId
    );
    if (matchRecipieId) {
      setRecipieData(matchRecipieId as Recipe);
    }
  }, [mealArray, recpieId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;  
  }

  if (recipieData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        className="main relative bg-cover bg-center h-[362px] w-full bg-no-repeat"
        style={{
          lineHeight: "48px",
          backgroundImage: `url(${recipieData.strMealThumb})`,
          filter: "grayscale(50%)",
        }}>
        <h4
          className="absolute text-white inset-0 flex items-center justify-center text-center text-yellow font-bold md:text-3xl line-height-2"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          {recipieData.strMeal}
        </h4>
      </div>

      <div className="container mx-auto mt-8 ps-10">
        <div key={recipieData.idMeal}>
          <div className="ingredients">
            <p className="flex flex-start text-2xl pb-2 font-medium">
              Ingredients
            </p>
            <ul className="my-5">
              <ul style={listStyle}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
                  const ingredient = recipieData[`strIngredient${index}` as keyof Recipe] as string;
                  if (ingredient) {
                    return (
                      <div key={index} className="py-1">
                        <li className="ms-10"> {ingredient}</li>
                      </div>
                    );
                  }
                  return null;
                })}
              </ul>
            </ul>
          </div>
          <div className="procedure pb-8 mt-7">
            <h3 className="flex flex-start pb-2 text-2xl font-medium">
              Procedure
            </h3>
            <p className="py-1 ms-4">{recipieData.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receitas;
