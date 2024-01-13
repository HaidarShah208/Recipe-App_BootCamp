// Store.ts
import { configureStore } from '@reduxjs/toolkit';
import spoonacularReducer from './Slice'

const store = configureStore({
  reducer: {
    spoonacular: spoonacularReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
