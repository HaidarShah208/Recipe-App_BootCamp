import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface SpoonacularState {
  recipe: any[];  
  loading: boolean;
  error: string | null;
}

export const fetchRecipe = createAsyncThunk('spoonacular/fetchRecipe', async () => {
  try {
    const response = await axios.get('https://food-recipes-with-images.p.rapidapi.com/', {
      params: { q: 'chicken soup' },
      headers: {
        'X-RapidAPI-Key': 'b13f17252cmsh1a8f8fac2123674p18bd41jsna43c634defe5',
        'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com',
      },
    });
    console.log('API Response:', response.data);
    return response.data.d;
  } catch (error) {
    throw new Error('Error fetching recipe data');
  }
});

const initialState: SpoonacularState = {
  recipe: [],
  loading: false,
  error: null,
};

const spoonacularSlice = createSlice({
  name: 'spoonacular',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipe.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;

        // Check if the response has a known structure with recipes
        const recipes = action.payload?.recipes || action.payload || [];

        state.recipe = Array.isArray(recipes) ? recipes : [recipes];
      })
      .addCase(fetchRecipe.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default spoonacularSlice.reducer;
