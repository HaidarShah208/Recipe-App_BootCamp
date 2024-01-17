// mealFetchSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import instance from '../helper/instance/Instance';

interface MealFetchState {
  meals: any[];
  loading: boolean;
  error: string | null;
}

export const fetchMeals = createAsyncThunk('meals/fetchMeals', async () => {
  try {
    const response = await instance.get('categories.php');
    return response.data.categories;
  } catch (error: any) {
    console.error(error);
  }
});

const initialState: MealFetchState = {
  meals: [],
  loading: false,
  error: null,
};

export const mealFetchSlice = createSlice({
  name: 'mealFetch',
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
  },
});

export default mealFetchSlice.reducer;
