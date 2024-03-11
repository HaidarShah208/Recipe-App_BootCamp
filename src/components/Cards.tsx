import React from "react";
import { useNavigate } from "react-router-dom";
import { RecipieCardProps } from "../types/types";

const Cards: React.FC<RecipieCardProps> = ({
  instriuctions,
  titile,
  image,
  recpieId,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const newRecipe = { image, titile, instriuctions, recpieId };
    const existingRecipesString = localStorage.getItem("recipes") ?? "[]";
    const existingRecipes = JSON.parse(existingRecipesString);
    const updatedRecipes = [...existingRecipes, newRecipe];
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    navigate(`/recipe/${recpieId}`);
  };
  return (
    <div
      className="shadow-md justify-center  flex flex-col bg-primary  rounded-t-3xl rounded-b-3xl"
      onClick={handleClick}
    >
      <div className="border-none hover:scale-105 duration-300">
        <img
          src={image}
          className="sm:w-[403px] w-[380px] h-[212px] object-cover rounded-t-3xl"
          alt="Card Image"
        />
      </div>
      <div className="flex flex-col justify-start h-[261px]">
        <h2 className="text-[32px] font-bold mb-2 flex justify-start ps-7 pt-10">
          {titile}
        </h2>
        <div className="pe-7  break-words">
          <p className="text-gray-600 text-start text-[20.71px] ps-7">{instriuctions} ...</p>
        </div>
        <button className="ms-7 mt-7 text-[20px] mb-4 bg-yellow px-4 py-2 rounded-3xl hover:bg-yellow-600 text-xl focus:outline-none focus:ring focus:border-yellow-300 w-[191px]">
          Read More
        </button>
      </div>
    </div>
  );
};

export default Cards;
