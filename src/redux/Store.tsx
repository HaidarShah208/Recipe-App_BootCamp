// Store.ts
import { configureStore } from '@reduxjs/toolkit';
import MealSlices from './MealSlice';
import mealFetchSlice from './SearchSlice';

const store = configureStore({
  reducer: {
    meals:MealSlices,
    mealFetch: mealFetchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
