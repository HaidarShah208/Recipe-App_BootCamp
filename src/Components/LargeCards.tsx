import React from "react";
import download from '../assests/download.jpeg';
import { useNavigate } from "react-router-dom";
interface RecipieCardProps{
  image:string,
  titile:string,
  instriuctions:string,
  ingredints?:string
  recpieId: string;
}
const LargeCards: React.FC<RecipieCardProps> = ({image,titile,instriuctions, ingredints, recpieId }) => {
  const navigate=useNavigate()
  const handleClick=()=>{
navigate(`/recite/${recpieId}`)
  }
  return (
    <>
      <div className="lg:flex justify-center lg:h-[240px] ">
        <div className="h-48 lg:h-auto sm:h-full lg:w-[300px] sm:w-full sm:h-[370px] object-cover flex-none bg-cover rounded-t lg:rounded-l text-center" style={{ backgroundImage: `url(${image})` }} title="Woman holding a mug">
        </div>
        <div className="lg:px-16 lg:max-w-[1067px]  lg:mx-auto sm:w-full border-b border-x border-1 border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal ">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2 text-start">{titile}</div>
            <p className="text-gray-700 text-base text-start">{instriuctions} </p>
          </div>
          <button
            className="mt-4 ms-7 mb-4 bg-yellow-300 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300 ms-0 max-w-[150px]" onClick={handleClick}>
            Read More
          </button>
        </div>
      </div>
    </>
  );
}

export default LargeCards;
