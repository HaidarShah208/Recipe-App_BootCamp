import React from "react";
import { useNavigate } from "react-router-dom";
import { RecipieLargeCardProps } from "../types/types";

const LargeCards: React.FC<RecipieLargeCardProps> = ({
  image,
  titile,
  instriuctions,
  recpieId,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/recipe/${recpieId}`);
  };
  return (
    <>
      <div
        className="bg-primary lg:max-w-[1187px] lg:flex md:w-auto max-w-[380px] justify-center lg:h-[322px] shadow my-3 border-2 rounded-3xl overflow-hidden"
        onClick={handleClick}
      >
        <div className="lg:h-[322px] lg:w-[403px]  h-[212px] w-[380px]  md:h-[212px]  flex-none overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt="Woman holding a mug"
            className="w-[380px]  h-full object-cover"
          />
        </div>
        <div className="lg:px-6 w-[380px] lg:w-auto lg:h-auto h-[261px] border-gray-400 lg:border-l-0   bg-gray-100 rounded lg:py-4 flex flex-col leading-normal">
          <h4 className="text-gray-900 font-bold sm:text-[40px] text-[32px] pt-7 text-start ps-3 my-2">
            {titile}
          </h4>
          <div className="pe-9 break-words">
            <p className="text-gray-700 text-[20px] text-base text-start my-2 ps-3 sm:pe-3 pe-12">
              {" "}
              {instriuctions} ....
            </p>
          </div>
          <button
            className="md:mt-3 text-[20px] ms-3 mb-4 bg-yellow rounded-3xl px-5 py-2 hover:bg-darkYellow focus:outline-none focus:ring focus:border-yellow-300  max-w-[150px] my-2"
            onClick={handleClick}
          >
            Read More
          </button>
        </div>
      </div>
    </>
  );
};

export default LargeCards;
