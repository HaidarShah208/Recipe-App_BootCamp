import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipe } from '../../redux/Slice'; // Correct the import path
import { RootState, AppDispatch } from '../../redux/Store';
import { useParams } from 'react-router-dom';
import { ReactNode } from 'react';
const Receitas: React.FC = () => {
  const {recpieId}=useParams()
  console.log('recpieId', recpieId)
  const dispatch = useDispatch<AppDispatch>();
  const recipesArray = useSelector((state: RootState) => state.spoonacular.recipe);
 const loading = useSelector((state: RootState) => state.spoonacular.loading);
  const error = useSelector((state: RootState) => state.spoonacular.error);
  const [recipieData,setRecipieData]= useState<any>(null);
  useEffect(() => {
    // Dispatch the fetchRecipe thunk when the component mounts
    dispatch(fetchRecipe());
  }, [dispatch]);
  useEffect(() => {
const matchRecipieId=recipesArray.find(recipies=>recipies.id.toString()===recpieId)
if(matchRecipieId){
setRecipieData(matchRecipieId)
}
  }, [recipesArray,recpieId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  if(recipieData==null){
    return <div>Loading...</div>;

  }
  const { Title, Ingredients, Instructions, Image } = recipieData;

  return (
    <div>
      <div
        className="main relative bg-cover bg-center h-[362px] w-full bg-no-repeat"
        style={{
          lineHeight: '48px',
          backgroundImage: `url(${Image})`,
          filter: 'grayscale(50%)',
        }}
      >
        <h2 className="absolute inset-0 flex items-center justify-center text-center text-yellow font-bold text-3xl line-height-2">
          {Title}
        </h2>
      </div>

      <div className="container mx-auto mt-8 ps-10 ">
        <div key={recipieData.id}>
        <div className="ingredients">
            <h3 className="flex flex-start pb-2 font-medium">Ingredients</h3>
            <ul>
              {Object.entries(Ingredients).map(([key, value]) => (
                <li key={key}>
                  <span>
                    <strong>{key}:</strong> {String(value as ReactNode)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="procedure pb-8">
            <h3 className="flex flex-start pb-2 font-medium">Procedure</h3>
            <p>{Instructions}</p>
          </div>
          {/* <div className="result">
            <h3 className="flex flex-start pb-2 font-medium">Result</h3>
            <p>{result}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Receitas;