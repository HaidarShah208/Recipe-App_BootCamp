import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchRecipes } from "../redux/SearchSlice";
import { AppDispatch, RootState } from "../redux/Store";
import { IMEGES } from "../constant/AllAssets";
import { Meal } from "../types/types";

const TopNavbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [sideNav, setSideNav] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const closeSideNav = () => {
    setSideNav(false);
  };
  const handleSearch = (searchQuery: string) => {
    dispatch(searchRecipes(searchQuery));
  };
  const handleClick = () => {
    navigate("/recite");
  };
  const mealArray: Meal[] = useSelector(
    (state: RootState) => state.meals.meals
  );
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      dispatch(searchRecipes(""));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      dispatch(searchRecipes(""));
    } else {
      dispatch(searchRecipes(searchValue));
    }
    const matchingProducts = mealArray.filter((item) =>
      item.strMeal.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (matchingProducts.length > 0) {
      alert(`${searchValue} founded in recipes ! `);
    }
  };

  return (
    <div className="max-w-[1286px] lg:mx-auto flex justify-between items-center p-4 sm:h-[113px] h-[80px]">
      <div className="flex items-center justify-start">
        <div className="cursor-pointer w-7 h-7 mb-2">
          <img src={IMEGES.Coffe} alt="cofee-Icon" />
        </div>
        <h1 className="hidden sm:block sm:text-2xl px-2 w-[234px] ">
          Delicias a Meta
        </h1>
      </div>
      <div className="hidden sm:flex items-center px-2 Hug-[406px] sm:w-[400px] lg:w-[500px] md:w-[170px] justify-center">
        <ul className="flex items-center justify-center">
          <li className="lg:w-[111px] sm:w-[60px]  h-[31px]">
            <Link to="/" className="lg:text-2xl font-bold">
              Home
            </Link>
          </li>
          <li className="lg:w-[111px] sm:w-[60px] h-[31px] ">
            <Link to="/recite" className="lg:text-2xl font-bold">
              Recipe
            </Link>
          </li>
          <li className="lg:w-[111px] sm:w-[60px]  h-[31px] ">
            <Link to="/store" className="lg:text-2xl font-bold">
              Store
            </Link>
          </li>
        </ul>
      </div>
      <div className="hidden sm:flex items-center bg-gray-200 rounded-full max-w-[400px] sm:w-[400px] lg:w-[258px] md:w-[170px]">
        <img src={IMEGES.Search} className="ms-4 w-3" />
        <form onSubmit={handleSubmit}>
          <input
            className="bg-transparent p-2 w-full focus:outline-none h-[48px]"
            type="text"
            placeholder="Search meals"
            value={searchValue}
            onChange={handleSearchChange}
            onClick={handleClick}
          />
          <button type="submit"></button>
        </form>
      </div>
      <div className="lg:hidden md:hidden ml-2 transition-transform transform duration-600">
        {sideNav ? (
          <img
            src={IMEGES.Toggle}
            alt="toggle-icon"
            onClick={() => {
              setSideNav(!sideNav);
            }}
            className={`transition-transform transform-3 duration-3000 w-7 ${
              sideNav ? "translate-x-0" : "translate-x-full"
            }`}
          />
        ) : (
          <img
            src={IMEGES.Toggle}
            alt="toggle-icon"
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
            src={IMEGES.Left}
            alt="left-icon"
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
