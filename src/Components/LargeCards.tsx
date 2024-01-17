import React from "react";
import { useNavigate } from "react-router-dom";
interface RecipieCardProps {
  image: string;
  titile: string;
  instriuctions: string;
  ingredints?: string;
  recpieId: string;
}
const LargeCards: React.FC<RecipieCardProps> = ({
  image,
  titile,
  instriuctions,
  ingredints,
  recpieId,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/recite/${recpieId}`);
  };
  return (
    <>
      <div className="bg-white-200 lg:max-w-[1187px] lg:flex justify-center lg:h-[322px] shadow my-3 md:mx-auto border-2 rounded-xl ">
        <div
          className=" lg:h-auto lg:w-[403px] h-[322px] sm:w-full md:w-[full] md:h-[250px] sm:h-[370px] bg-cover flex-none bg-center rounded-t lg:rounded-l"
          style={{ backgroundImage: `url(${image})` }}
          title="Woman holding a mug"
        ></div>
        <div className="lg:px-16 sm:w-full  border-gray-400 lg:border-l-0  bg-white rounded lg:py-4 flex flex-col leading-normal">
          <h4
            className="text-gray-900 font-bold text-xl pt-10 text-start"
            style={{ margin: "10px" }}
          >
            {titile} ...
          </h4>
          <p
            className="text-gray-700  text-base text-start"
            style={{ margin: "10px" }}
          >
            {instriuctions} ....
          </p>

          <button
            className="md:mt-3  mb-4 bg-yellow-300 px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300 ms-0 max-w-[150px]"
            onClick={handleClick}
            style={{ margin: "10px" }}
          >
            Read More
          </button>
        </div>
      </div>
    </>
  );
};

export default LargeCards;
