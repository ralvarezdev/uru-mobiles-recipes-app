import { http } from "@/api";
import type { Recipe } from "@/entities/Recipe";
import type { QueryParams } from "@/types/api/QueryParams";
import type { RequestOptions } from "@/types/api/RequestOptions";
import type {
  AddRecipeToGroupInput,
  CreateRecipeInput,
  GetRecipeResponse,
  GetRecipesByGroupResponse,
  GetRecipesParams,
  GetRecipesResponse,
  UpdateRecipeInput,
} from "./types";

/** Recetas (REST real). */
export class RecipeService {
  getRecipe = (recipeId: number, options?: RequestOptions) =>
    http.get<GetRecipeResponse>(`/api/Recipe/GetRecipe/${recipeId}`, options);

  getRecipes = (params?: GetRecipesParams & QueryParams, options?: RequestOptions) =>
    http.get<GetRecipesResponse>(`/api/Recipe/GetRecipes`, params, options);

  getRecipesByUser = (author: string, options?: RequestOptions) =>
    http.get<GetRecipesResponse>(`/api/Recipe/GetRecipesByUser/${author}`, options);

  getRecipesByCategory = (categoryId: number, options?: RequestOptions) =>
    http.get<GetRecipesResponse>(`/api/Recipe/GetRecipesByCategory/${categoryId}`, options);

  createRecipe = (input: CreateRecipeInput, options?: RequestOptions) =>
    http.post<Recipe, CreateRecipeInput>(`/api/Recipe/PostRecipe`, input, options);

  updateRecipe = (recipeId: number, input: UpdateRecipeInput, options?: RequestOptions) =>
    http.put<Recipe, UpdateRecipeInput>(`/api/Recipe/PutRecipe/${recipeId}`, input, options);

  deleteRecipe = (recipeId: number | string, options?: RequestOptions) =>
    http.delete<void>(`/api/Recipe/DeleteRecipe/${recipeId}`, options);

  getRecipesByGroup = (groupId: number, options?: RequestOptions) =>
      http.get<GetRecipesByGroupResponse>(`/api/Recipe/GetRecipesByGroup/${groupId}`, undefined, options);

  addRecipeToGroup = (input: AddRecipeToGroupInput, options?: RequestOptions) =>
    http.post<void, AddRecipeToGroupInput>(`/api/Recipe/PostRecipeToGroup`, input, options);

  removeRecipeFromGroup = (groupId: number | string, recipeId: number | string, options?: RequestOptions) =>
    http.delete<void>(`/api/Group/DeleteRecipeFromGroup/${groupId}/${recipeId}`, options);
}

export const recipeService = new RecipeService();
