import React from 'react';
import { useNavigate } from 'react-router-dom';
interface RecipieCardProps{
  image:string,
  titile:string,
  instriuctions:string,
  recpieId: string;
}
const Cards: React.FC<RecipieCardProps> = ({instriuctions,titile,image,recpieId}) => {
  const navigate=useNavigate()
  const handleClick = () => {
    console.log('Navigating to:', `/recite/${recpieId}`);
    navigate(`/recite/${recpieId}`);
  }
  return (
    <div className="bg-white-200 rounded-lg shadow-md w-[300px] flex flex-col">
      <div className="border-none hover:scale-105 duration-300">
        <img src={image} className="w-full h-[212px] object-cover rounded-lg" alt="Card Image" />
      </div>
      <h2 className="text-xl font-bold mb-2 flex justify-start ps-7 pt-6">{titile}...</h2>
      <p className="text-gray-600 text-start ps-7">
        {instriuctions} ...
      </p>
      <button
        className="mt-4 ms-7 mb-4 bg-yellow-300 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300 w-[150px]"
        onClick={handleClick}   >
        Read More
      </button>
    </div>
  );
}

export default Cards;
