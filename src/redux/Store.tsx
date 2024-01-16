// Store.ts
import { configureStore } from '@reduxjs/toolkit';
import spoonacularReducer from './Slice'
import mealSlices from './mealSlice';

const store = configureStore({
  reducer: {
    spoonacular: spoonacularReducer, 
    meals:mealSlices
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
