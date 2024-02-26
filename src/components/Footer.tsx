import React from "react";
import { IMEGES } from "../constant/AllAssets";

const Footer: React.FC = () => {
  return (
    <section className="py-12 bg-yellow text-gray-900 mt-12 h-[273px] ">
      <div className="container mx-auto flex flex-col justify-around p-4 text-center md:p-10 lg:flex-row">
        <div className="flex lg:flex my-auto justify-center lg:text-left">
          <p className="">
            <img src={IMEGES.Coffe} className="mt-2" alt="cofee-Icon" />
          </p>
          <h1 className="my-1 sm:block hidden ps-3 text-3xl font-medium leading-tight title-font">
            Delicias a Meta
          </h1>
        </div>
        <div className="flex flex-col md:flex-col my-auto items-center justify-center flex-shrink-0 mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:ml-4 lg:mt-0 lg:justify-end">
          <p className=" sm:py-2 font-medium">Redes Socials:</p>
          <div className="flex">
            <div className="mx-1">
              <img src={IMEGES.Youtube} alt="youtube-icon" />
            </div>
            <div>
              <img src={IMEGES.Twitter} alt="twiter-icon" />
            </div>
            <div className="mx-1">
              <img src={IMEGES.Browser} alt="browser-icon" />
            </div>
            <div>
              <img src={IMEGES.Pinterest} alt="pinterest" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
