import React from 'react';
import { useNavigate } from 'react-router-dom';
interface RecipieCardProps{
  image:string,
  titile:string,
  instriuctions:string,
  recpieId: number;
}
const Cards: React.FC<RecipieCardProps> = ({instriuctions,titile,image,recpieId}) => {
  const navigate=useNavigate()
  const handleClick = () => {
    console.log('Navigating to:', `/recite/${recpieId}`);
    navigate(`/recite/${recpieId}`);
  }
  return (
    <div className="shadow-md justify-center  flex flex-col bg-primary">
      <div className="border-none hover:scale-105 duration-300">
        <img src={image} className="w-full h-[212px] object-cover  rounded-lg" alt="Card Image" />
      </div>
     <div className='flex flex-col justify-start mt-5 '>
     <h2 className="text-3xl font-bold mb-2 flex justify-start ps-7 pt-10">{titile}</h2>
      <p className="text-gray-600 text-start ps-7">
        {instriuctions} ...
      </p>
      <button
        className="ms-7 mt-7 mb-4 bg-yellow px-4 py-2 rounded-3xl hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300 w-[191px]"
        onClick={handleClick} style={{fontSize:'20px'}}>
        Read More
      </button>
     </div>
    </div>
  );
}

export default Cards;
