export type Category ={
  strCategory: string;
  strCategoryDescription:string;
  strCategoryThumb: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  idMeal:number,
  strMeasure:string
}

export type AllCategorys= {
  strCategory: string;
  strCategoryDescription: string;
  strCategoryThumb: string;
  strMeal: string;  
  strMealThumb: string;
  strInstructions: string;
  idMeal: number;
}

export type MyError ={
  message: string
  
}
export type MealFetchState= {
  meals: Category[];
  loading: boolean;
  error: MyError | null;
}


export type Recipe = {
  idMeal: number;
  strMealThumb: string;
  strMeal: string;
  strInstructions: string;
  strMeasure: string,
};

export type Recipes ={
  strMealThumb: string;
  idMeal: number;
  strMeal: string;  
  strCategoryDescription: string;
  strInstructions: string;
}

export type Categorys = {
  idMeal: number;
};


export type MealSearchState= {
  searchResults: Recipes[];
  loading: boolean;
  error: MyError | null;
  
}

export type RecipieLargeCardProps ={
  image: string;
  titile: string;
  instriuctions: string;
  ingredints?: string;
  recpieId: number;
}

export type MealSearchStates ={
  searchResults: Recipes[];
  loading: boolean;
  error: MyError | null;
  defaultResults: [], // Add this line
  }

 export type RecipieCardProps={
    image:string,
    titile:string,
    instriuctions:string,
    recpieId: number;
  }

export type  RecipeType= {
    recpieId: number;
    image: string;
    titile: string;
    instriuctions: string;
  }