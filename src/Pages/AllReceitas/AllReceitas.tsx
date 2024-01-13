import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipe } from '../../redux/Slice'; // Correct the import path
import { RootState, AppDispatch } from '../../redux/Store';
import { useParams } from 'react-router-dom';
import { ReactNode } from 'react';
import Cards from '../../Components/Cards';
const AllReceitas: React.FC = () => {
  const {recpieId}=useParams()
  console.log('recpieId', recpieId)
  const dispatch = useDispatch<AppDispatch>();
  const recipesArray = useSelector((state: RootState) => state.spoonacular.recipe);
 const loading = useSelector((state: RootState) => state.spoonacular.loading);
  const error = useSelector((state: RootState) => state.spoonacular.error);

  useEffect(() => {
    // Dispatch the fetchRecipe thunk when the component mounts
    dispatch(fetchRecipe());
  }, [dispatch]);
  return (
    <div className="container mx-auto flex flex-col justify-center items-center py-16 text-center ">
    <h1 className="col-span-12 text-2xl mb-14 font-bold">
      Receitas mais procuradas
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
    {recipesArray.map((item) => (
<Cards
        key={item.id} // Ensure unique keys for each card
        image={item.Image} // Assuming image is a property of each item
        titile={item.Title}
        instriuctions={item.Instructions.slice(0, 100)} recpieId={item.id}/>
))}
      
    </div>
  </div>
  );
};

export default AllReceitas;