export interface Category {
  strCategory: string;
  strCategoryDescription:string;
  strCategoryThumb: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  idMeal:number,
  strMeasure:string
}

export interface AllCategorys {
  strCategory: string;
  strCategoryDescription: string;
  strCategoryThumb: string;
  strMeal: string;  
  strMealThumb: string;
  strInstructions: string;
  idMeal: number;
}

export interface MyError {
  message: string
  
}
export interface MealFetchState {
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

export interface Recipes {
  strMealThumb: string;
  idMeal: number;
  strMeal: string;  
  strCategoryDescription: string;
  strInstructions: string;
}

export type Categorys = {
  idMeal: number;
};


export interface MealSearchState {
  searchResults: Recipes[];
  loading: boolean;
  error: MyError | null;
}

export interface RecipieLargeCardProps {
    image: string;
    titile: string;
    instriuctions: string;
    ingredints?: string;
    recpieId: number;
  }

 export interface MealSearchStates {
    searchResults: Recipes[];
    loading: boolean;
    error: MyError | null;
  }

 export interface RecipieCardProps{
    image:string,
    titile:string,
    instriuctions:string,
    recpieId: number;
  }