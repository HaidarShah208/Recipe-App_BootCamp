import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import instance from "../utilities/Instance";
import { MealFetchState, MyError } from "../types/types";

export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  try {
    const response = await instance.get("search.php?s");
    return response.data.meals;
  } catch (error: any) {
    throw new Error(error?.message ?? "Fetch recipes error");
  }
});

const initialState: MealFetchState = {
  meals: [],
  loading: false,
  error: null,
};

export const mealFetchSlice = createSlice({
  name: "mealFetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading = false;
        const meals = action.payload;
        state.meals = Array.isArray(meals) ? meals : [meals];
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as MyError;
        }
      });
  },
});

export default mealFetchSlice.reducer;
