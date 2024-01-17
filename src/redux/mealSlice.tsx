// mealSlice.tsx
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import instance from '../helper/instance/Instance';

interface MealState {
  meals: any[];
  loading: boolean;
  error: string | null;
  searchResults: any[];
}

export const fetchMeals = createAsyncThunk('meals/fetchMeals', async () => {
  try {
    const response = await instance.get('categories.php');
    return response.data.categories;
  } catch (error: any) {
    console.error(error);
  }
});

export const searchRecipes = createAsyncThunk('meals/searchRecipes', async (searchQuery: string) => {
  try {
    const response = await instance.get('categories.php', {
      params: { q: searchQuery },
    });

    const allRecipes = response.data.categories as any[];
    const filteredRecipes = allRecipes.filter(recipe => {
      return recipe.strCategory.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return filteredRecipes;
  } catch (error) {
    throw new Error("Error searching recipes");
  }
});

const initialState: MealState = {
  meals: [],
  loading: false,
  error: null,
  searchResults: [],
};

export const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const meals = action.payload?.meals || action.payload || [];
        state.meals = Array.isArray(meals) ? meals : [meals];
      })
      .addCase(fetchMeals.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Search meals
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

export default mealSlice.reducer;
