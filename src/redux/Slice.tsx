import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface SpoonacularState {
  [x: string]: any;
  recipe: any[];
  loading: boolean;
  error: string | null;
  searchResults:any[]
}

export const fetchRecipe = createAsyncThunk(
  "spoonacular/fetchRecipe",
  async () => {
    try {
      const response = await axios.get(
        "https://food-recipes-with-images.p.rapidapi.com/",
        {
          params: { q: "chicken soup" },
          headers: {
            'X-RapidAPI-Key': 'bb77153596msh4cca88a595b2afdp13a76djsn4559cf969ca5',
            'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com'
          }
        }
      );
      console.log("API Response:", response.data);
      return response.data.d;
    } catch (error) {
      throw new Error("Error fetching recipe data");
    }
  }
);

// search recipes
export const searchRecipes = createAsyncThunk('spoonacular/searchRecipes', async (searchQuery: string) => {
  try {
    console.log('searchRecipes async thunk called with query:', searchQuery);
      // Make an API call with the search query
      const response = await axios.get(
        `https://food-recipes-with-images.p.rapidapi.com/`,
        {
          params: { q: searchQuery },
          headers: {
            'X-RapidAPI-Key': 'bb77153596msh4cca88a595b2afdp13a76djsn4559cf969ca5',
            'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com'
          }
        }
      );
      console.log('searched resipies',response.data.d)
      return response.data.d;
    } catch (error) {
      throw new Error("Error searching recipes");
    }
  }
);

const initialState: SpoonacularState = {
  recipe: [],
  loading: false,
  error: null,
  searchResults: [],
};

const spoonacularSlice = createSlice({
  name: 'spoonacular',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ... (existing code)
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
// search query
    builder
      .addCase(searchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const recipes = action.payload?.recipes || action.payload || [];
        state.searchResults = Array.isArray(recipes) ? recipes : [recipes];
      })
      .addCase(searchRecipes.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default spoonacularSlice.reducer;
