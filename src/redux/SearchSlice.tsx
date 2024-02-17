import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import instance from '../helper/instance/Instance';
import { AllCategorys, MealSearchStates, MyError, Recipes } from '../types/types';


export const searchRecipes = createAsyncThunk(
  'meals/searchRecipes',
  async (searchQuery: string) => {
    try {
      const response = await instance.get('search.php?s', { params: { q: searchQuery } });

      const allRecipes = response.data.meals as AllCategorys[];
      const filteredRecipes = allRecipes.filter((recipe) => {
        return recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase());
      });

      return filteredRecipes as Recipes[];  
    } catch (error) {
      throw ('Error searching recipes'); 
    }
  }
);

const initialState: MealSearchStates = {
  searchResults: [],
  loading: false,
  error: null,
};

export const mealSearchSlice = createSlice({
  name: 'mealSearch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action: PayloadAction<Recipes[]>) => {
        state.loading = false;
        const recipes = action.payload || [];
        state.searchResults = recipes;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as MyError;
        }
      });
  },
});

export default mealSearchSlice.reducer;
