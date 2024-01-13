import React, { useEffect } from "react";
import Cards from "../../Components/Cards";
import LargeCards from "../../Components/LargeCards";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { fetchRecipe } from "../../redux/Slice";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipesArray = useSelector((state: RootState) => state.spoonacular.recipe);
 const loading = useSelector((state: RootState) => state.spoonacular.loading);
  const error = useSelector((state: RootState) => state.spoonacular.error);
  useEffect(() => {
    // Dispatch the fetchRecipe thunk when the component mounts
    dispatch(fetchRecipe());
  }, [dispatch]);
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
        <h2 className="absolute inset-0 flex items-center justify-center text-center text-yellow font-bold text-3xl line-height-2">
          Get Inspired, Cook with passion and enjoy <br /> unforgettable moments
          at the table
        </h2>
      </div>

      <div className="container mx-auto flex flex-col justify-center items-center py-16 text-center ">
        <h1 className="col-span-12 text-2xl mb-14 font-bold">
          Receitas mais procuradas
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {recipesArray.slice(0,3).map((item) => (
  <Cards
            key={item.id} // Ensure unique keys for each card
            image={item.Image} // Assuming image is a property of each item
            titile={item.Title}
            instriuctions={item.Instructions.slice(0, 100)} recpieId={item.id}  />
))}
          
        </div>
      </div>

      <div className="container mx-auto flex flex-col text-center justify-center px-3">
        <h1 className="col-span-12 text-2xl font-bold pb-16">
          Receitas recentes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-5 ">
        {recipesArray.slice(10,13).map((item) => (
  <LargeCards
    key={item.id}
    recpieId={item.id}  // Ensure unique keys for each card
    image={item.Image} // Assuming image is a property of each item
    titile={item.Title}
    instriuctions={item.Instructions.slice(0,100)}
  />
))}
     
         
          
        </div>
      </div>
    </>
  );
};

export default Home;
