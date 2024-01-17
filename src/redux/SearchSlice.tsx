// mealSearchSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import instance from '../helper/instance/Instance';

interface MealSearchState {
  searchResults: any[];
  loading: boolean;
  error: string | null;
}

export const searchRecipes = createAsyncThunk('meals/searchRecipes', async (searchQuery: string) => {
  try {
    const response = await instance.get('categories.php', {
      params: { q: searchQuery },
    });

    const allRecipes = response.data.categories as any[];
    const filteredRecipes = allRecipes.filter((recipe) => {
      return recipe.strCategory.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return filteredRecipes;
  } catch (error) {
    throw new Error('Error searching recipes');
  }
});

const initialState: MealSearchState = {
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
      .addCase(searchRecipes.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const recipes: any[] = action.payload || [];
        state.searchResults = recipes;
      })
      .addCase(searchRecipes.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mealSearchSlice.reducer;
