import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipe, searchRecipes } from '../../redux/Slice'; // Correct the import path
import { RootState, AppDispatch } from '../../redux/Store';
import { useParams } from 'react-router-dom';
import { ReactNode } from 'react';
import Loader from '../../components/Loader';
import { fetchMeals } from '../../redux/mealSlice';

const Receitas: React.FC = () => {

  const {recpieId}=useParams()
  console.log('recpieId', recpieId)
  const dispatch = useDispatch<AppDispatch>();
  const recipesArray = useSelector((state: RootState) => state.spoonacular.recipe);
  const mealArray = useSelector((state: RootState) => state.meals.meals);

  const searchResults = useSelector((state: RootState) => state.spoonacular.searchResults);
 const loading = useSelector((state: RootState) => state.spoonacular.loading);
  const error = useSelector((state: RootState) => state.spoonacular.error);
  const [recipieData,setRecipieData]= useState<any>(null);

  useEffect(() => {
    dispatch(fetchRecipe());
  }, [dispatch]);
  useEffect(() => {
    dispatch(searchRecipes('chicken soup'));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  useEffect(() => {
// const matchRecipieId=recipesArray.find(recipies=>recipies.id.toString()===recpieId)
const matchRecipieId = mealArray.find((recipies) => recipies.idCategory.toString() === recpieId);
if(matchRecipieId){
setRecipieData(matchRecipieId)
}
  }, [searchResults,recpieId]);

  if (loading) {
    return  <Loader/>
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  if(recipieData===null){
    return <div>Loading...</div>;

  }
  const { strCategory, Ingredients, strCategoryDescription, strCategoryThumb } = recipieData;

  return (
    <div>
      <div
        className="main relative bg-cover  bg-center h-[362px] w-full bg-no-repeat"
        style={{
          lineHeight: '48px',
          backgroundImage: `url(${strCategoryThumb})`,
          filter: 'grayscale(50%)',
        }}
      >
        <h4 className="absolute text-white inset-0 flex items-center justify-center text-center text-yellow font-bold md:text-3xl line-height-2" style={{backgroundColor:'rgba(0, 0, 0, 0.6)'}}>
          {strCategory}
        </h4>
      </div>

      <div className="container mx-auto mt-8 ps-10 ">
        <div key={recipieData.id}>
        <div className="ingredients">
            <h3 className="flex flex-start text-2xl pb-2 font-medium">Ingredients</h3>
            {/* <ul>
              {Object.entries(Ingredients).map(([key, value]) => (
                <li key={key} className='py-1'>
                  <span>
                    <strong>{key}:</strong> {String(value as ReactNode)}
                  </span>
                </li>
              ))}
            </ul> */}
          </div>
          <div className="procedure pb-8 mt-7" >
            <h3 className="flex flex-start pb-2 text-2xl font-medium">Procedure</h3>
            <p className='py-1'>{strCategoryDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receitas;