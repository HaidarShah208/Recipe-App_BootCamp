import React, { useEffect, useState } from 'react';
import LargeCards from '../../components/LargeCards';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { fetchMeals, searchRecipes } from '../../redux/mealSlice';

const Store: React.FC = () => {
  const { searchQuery } = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch<AppDispatch>();
  const mealArray = useSelector((state: RootState) => state.meals.meals);
  const searchResults = useSelector((state: RootState) => state.meals.searchResults);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    dispatch(fetchMeals());
    if (searchQuery) {
      dispatch(searchRecipes(searchQuery));
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, searchQuery]);

  return (
    <div className="container mx-auto flex flex-col text-center justify-center px-3" style={{ maxWidth: windowWidth < 768 ? '380px' : '100%' }}>
      <h1 className="col-span-12 text-2xl my-10 font-bold">
        {searchResults.length > 0 ? "Search Results" : "Receitas mais procuradas"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 sm:mx-5 md:rounded-none lg:rounded-3xl">
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <LargeCards
              key={item.idCategory}
              image={item.strCategoryThumb}
              titile={item.strCategory.slice(0, 24)}
              instriuctions={item.strCategoryDescription.slice(0, 100)}
              recpieId={item.idCategory}
            />
          ))
        ) : (
          mealArray.map((item) => (
            <LargeCards
              key={item.idCategory}
              image={item.strCategoryThumb}
              titile={item.strCategory.slice(0, 24)}
              instriuctions={item.strCategoryDescription.slice(0, 100)}
              recpieId={item.idCategory}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Store;
