import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchRecipes } from "../redux/SearchSlice";
import { AppDispatch } from "../redux/Store";
import coffee from "../assests/Ico.png"
import left from "../assests/left.png"
import toggle from "../assests/toggle.png"
import icon from "../assests/icon.png"



const TopNavbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [sideNav, setSideNav] = useState<boolean>(false);
  const navigate = useNavigate();

  const closeSideNav = () => {
    setSideNav(false);
  };

  /// handle search
  
  const handleSearch = (searchQuery: string) => {
    dispatch(searchRecipes(searchQuery));
  };
  const handleClick=()=>{
    navigate("/recite");
  }

  return (
    <div className="max-w-[1286px] lg:mx-auto flex justify-between items-center p-4 sm:h-[113px] h-[80px]">
      <div
        className="flex items-center justify-start"
        style={{ height: "31px" }}
      >
        <div className="cursor-pointer w-7 h-7 mb-2">
          <img src={coffee} alt="cofee-Icon" />
        </div>
        <h1
          className="hidden sm:block sm:text-3xl px-2"
          style={{ width: "234px" ,fontSize:'26px'}}
        >
          Delicias a Meta
        </h1>
      </div>

      <div className="hidden sm:flex items-center px-2 Hug-[406px] sm:w-[400px] lg:w-[500px] md:w-[170px] justify-center">
        <ul className="flex items-center justify-center">
          <li className="lg:w-[111px] sm:w-[60px] font-medium h-[31px] " style={{fontSize:'26px'}}>
            <Link to="/">Home</Link>
          </li>
          <li className="lg:w-[111px] sm:w-[60px] h-[31px] font-medium" style={{fontSize:'26px'}}>
            <Link to="/recite">Recipe</Link>
          </li>
          <li className="lg:w-[111px] sm:w-[60px] font-medium h-[31px]" style={{fontSize:'26px'}}>
            <Link to="/store">Store</Link>
          </li>
        </ul>
      </div>

      <div className="hidden sm:flex items-center bg-gray-200 rounded-full max-w-[400px] sm:w-[400px] lg:w-[258px] md:w-[170px]">
        <img src={icon} className="ms-4 w-3" />
        <input
          className="bg-transparent p-2 w-full focus:outline-none h-[48px]"
          type="text"
          placeholder="Search meals"
          onChange={(e) => handleSearch(e.target.value)}
          onClick={handleClick}
        />
      </div>

      <div className="lg:hidden md:hidden ml-2 transition-transform transform duration-600">
        {sideNav ? (
          <img src={toggle}
            onClick={() => {
              setSideNav(!sideNav);
            }}
            className={`transition-transform transform-3 duration-3000 w-7 ${
              sideNav ? "translate-x-0" : "translate-x-full"
            }`}
          />
        ) : (
          <img src={toggle}
            onClick={() => {
              setSideNav(!sideNav);
            }}
            className={`transition-transform transform-3 duration-3000 w-8 h-7 ${
              sideNav ? "translate-x-full" : "translate-x-0"
            }`}
          />
        )}
      </div>

      {sideNav && (
        <div
          className={`fixed top-0 right-0 w-[300px] h-screen bg-white z-10 transform transition-transform duration-500 ${
            sideNav ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <img
            src={left}
            onClick={() => setSideNav(!sideNav)}
            className="absolute right-4 top-4 cursor-pointer w-7"
          />
          <h2 className="text-2xl p-4">
            Delicias a <span className="text-orange-700 font-bold"> Meta</span>
          </h2>
          <nav>
            <ul className="flex flex-col p-4  text-gray-900">
              <li
                className="text-xl py-2 ps-3 mb-2 flex bg-yellow-200 "
                onClick={closeSideNav}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                className="text-xl py-2 ps-3 mb-2 flex  bg-yellow-200"
                onClick={closeSideNav}
              >
                <Link to="/recite">Recipe</Link>
              </li>
              <li
                className="text-xl py-2 ps-3 mb-2 flex  bg-yellow-200"
                onClick={closeSideNav}
              >
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
