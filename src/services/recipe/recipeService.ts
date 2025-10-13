import { createHttpClient, HttpClient } from "@/api";
import type { Recipe } from "@/entities/Recipe";
import type { QueryParams } from "@/types/api/QueryParams";
import type { RequestOptions } from "@/types/api/RequestOptions";
import type {
    CreateRecipeInput,
    GetRecipesParams,
    GetRecipesResponse,
    UpdateRecipeInput,
} from "./types";

/**
 * Servicio RESTful para manejar operaciones sobre Recetas.
 *
 * Endpoints implementados:
 *  - GET    /recipes                 (listado con filtro ?descripcion=)
 *  - POST   /recipes                 (crear)
 *  - PUT    /recipes/:recipeId       (actualizar)
 *  - DELETE /recipes/:recipeId       (eliminar)
 *
 * Nota: la verificación de "no duplicar nombre/título" debe implementarse
 * en el backend. Si quieres, podemos agregar una verificación optimista
 * en cliente consultando /recipes?nombre= antes de crear.
 */
export class RecipeService {
  private readonly http: HttpClient;

  constructor(http: HttpClient = createHttpClient()) {
    this.http = http;
  }

  /**
   * Lista recetas con filtro opcional por descripción.
   * GET /recipes?descripcion=...
   */
  getRecipes = (
    params?: GetRecipesParams & QueryParams,
    options?: RequestOptions
  ) => this.http.get<GetRecipesResponse>(`recipes`, params, options);

  /**
   * Crea una receta.
   * POST /recipes
   */
  createRecipe = (input: CreateRecipeInput, options?: RequestOptions) =>
    this.http.post<Recipe, CreateRecipeInput>(`recipes`, input, options);

  /**
   * Actualiza una receta por ID.
   * PUT /recipes/:recipeId
   */
  updateRecipe = (
    recipeId: number | string,
    input: UpdateRecipeInput,
    options?: RequestOptions
  ) => this.http.put<Recipe, UpdateRecipeInput>(`recipes/${recipeId}`, input, options);

  /**
   * Elimina una receta por ID.
   * DELETE /recipes/:recipeId
   */
  deleteRecipe = (recipeId: number | string, options?: RequestOptions) =>
    this.http.delete<void>(`recipes/${recipeId}`, options);
}

/** Instancia singleton de conveniencia. */
export const recipeService = new RecipeService();
