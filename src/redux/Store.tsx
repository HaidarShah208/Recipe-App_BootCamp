// Store.ts
import { configureStore } from '@reduxjs/toolkit';
import spoonacularReducer from './Slice'
import mealSlices from './mealSlice';
import mealFetchSlice from './SearchSlice';

const store = configureStore({
  reducer: {
    // spoonacular: spoonacularReducer, 
    meals:mealSlices,
    mealFetch: mealFetchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
