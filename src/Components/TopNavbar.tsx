import React, { useState } from "react";
import {AiOutlineSearch,AiOutlineClose} from "react-icons/ai";
import {BsArrowLeft,BsHouse} from "react-icons/bs";
import {  FaBars, FaCookie } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { PiCoffee } from "react-icons/pi";

const TopNavbar: React.FC = () => {
  const [sideNav, setSideNav] = useState<boolean>(false);

  const closeSideNav = () => {
    setSideNav(false);
  };

  return (
    <div className="max-w-[1286px] lg:mx-auto flex justify-between items-center p-4">
      <div
        className="flex items-center justify-start"
        style={{ height: "31px" }}>
        <div className="cursor-pointer">
          <PiCoffee size={25} />
        </div>
        <h1
          className="hidden sm:block sm:text-3xl px-2"
          style={{ width: "234px" }}>
          Delicias a Meta
        </h1>
      </div>

      <div className="hidden sm:flex items-center px-2 Hug-[406px] sm:w-[400px] lg:w-[500px] md:w-[170px] justify-center">
        <ul className="flex items-center">
          <li className="w-[75px] font-medium">
            <Link to="/">Home</Link>
          </li>
          <li className="w-[75px] font-medium">
            <Link to="/recite">Recite</Link>
          </li>
          <li className="w-[75px] font-medium">
            <Link to="/store">Store</Link>
          </li>
        </ul>
      </div>

      <div className="hidden sm:flex items-center bg-gray-200 rounded-full max-w-[400px] sm:w-[400px] lg:w-[258px] md:w-[170px]">
        <AiOutlineSearch size={20} className="ms-2" />
        <input
          className="bg-transparent p-2 w-full focus:outline-none"
          type="text"
          placeholder="Search meals"
        />
      </div>

      <div className="lg:hidden md:hidden ml-2">
        {sideNav ? (
          <AiOutlineClose
            size={25}
            onClick={() => setSideNav(!sideNav)}
          />
        ) : (
          <FaBars size={25} onClick={() => setSideNav(!sideNav)} />
        )}
      </div>

      {sideNav && (
        <div className={`fixed top-0 right-0 w-[300px] h-screen bg-white z-10 duration-500 ${sideNav ? 'opacity-100' : 'opacity-0'}`}>
          <BsArrowLeft
            onClick={() => setSideNav(!sideNav)}
            size={25}
            className="absolute right-4 top-4 cursor-pointer"
          />
          <h2 className="text-2xl p-4">
            Delicias a <span className="text-orange-700 font-bold"> Meta</span>
          </h2>
          <nav>
            <ul className="flex flex-col p-4 text-gray-900">
              <li className="text-xl py-4 flex" onClick={closeSideNav}>
                <BsHouse
                  size={25}
                  className="mr-4 text-white bg-black rounded-full"
                />
                <Link to="/">Home</Link>
              </li>
              <li className="text-xl py-4 flex" onClick={closeSideNav}>
                <FaCookie
                  size={25}
                  className="mr-4 text-white bg-black rounded-full"
                />
                <Link to="/recite">Recite</Link>
              </li>
              <li className="text-xl py-4 flex" onClick={closeSideNav}>
                <MdOutlineFavorite
                  size={25}
                  className="mr-4 text-white bg-black rounded-full"
                />
                <Link to="/store">Store</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
