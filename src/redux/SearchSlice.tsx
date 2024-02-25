import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import instance from '../utilities/Instance';
import { AllCategorys, MealSearchStates, MyError, Recipes } from '../types/types';

export const searchRecipes = createAsyncThunk(
  'meals/searchRecipes',
  async (searchQuery: string, { dispatch }) => {
    try {
      if (!searchQuery) {
        // If searchQuery is empty, dispatch clearSearchResults and fetch default results
        dispatch(clearSearchResults());
        const response = await instance.get('search.php?s', { params: { q: 'default' } });
        const defaultRecipes = response.data.meals as AllCategorys[];
        return defaultRecipes as Recipes[];
      }

      console.log("Making API request with search query:", searchQuery);
      const response = await instance.get('search.php?s', { params: { q: searchQuery } });
      console.log("API Response:", response);

      const allRecipes = response.data.meals as AllCategorys[];
      const filteredRecipes = allRecipes.filter((recipe) => {
        return recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase());
      });

      console.log("Filtered Recipes:", filteredRecipes);
      return filteredRecipes as Recipes[];
    } catch (error) {
      throw ('Error searching recipes');
    }
  }
);
export const initialState: MealSearchStates = {
  searchResults: [],
  loading: false,
  error: null,
  defaultResults: [], // Add this line
};

export const mealSearchSlice = createSlice({
  name: 'mealSearch',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      // Clear search results when needed
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action: PayloadAction<Recipes[]>) => {
        const recipes = action.payload || [];
        state.loading = false;
        state.searchResults = recipes; // Set searchResults directly without checking length
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as MyError;
        }
      });
  },
});

export const { clearSearchResults } = mealSearchSlice.actions;

export default mealSearchSlice.reducer;
