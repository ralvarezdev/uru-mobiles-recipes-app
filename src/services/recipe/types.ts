import type { Recipe } from "@/entities/Recipe";

/**
 * Filtros para listado de recetas.
 */
export type GetRecipesParams = {
  /** Filtro por descripción (contiene). */
  descripcion?: string;
};

/**
 * Entrada para crear una receta.
 */
export type CreateRecipeInput = {
  image: File | string;
  title: string;
  description?: string;
  prepareTime: number;
  unitPrepareTime: string;
  portions: number;
  categoryId: number;
  ingredients: string; 
  steps: string;
  author:string;
};

/**
 * Entrada para actualizar una receta (parcial).
 */
export type UpdateRecipeInput = {
  id: number;
  image: File | string;
  title: string;
  description?: string;
  prepareTime: number;
  unitPrepareTime: string;
  portions: number;
  categoryId: number;
  ingredients: string; 
  steps: string;
  author:string;
};

/**
 * Respuesta de listado de recetas (ajusta si tu backend envía otra estructura).
 */
export type GetRecipesResponse = Recipe[];

/**
 * Respuesta de listado de recetas (ajusta si tu backend envía otra estructura).
 */
export type GetRecipeResponse = Recipe;

/**
 * Respuesta de listado de recetas (ajusta si tu backend envía otra estructura).
 */
export type GetRecipesByGroupResponse = Recipe[];

/**
 * Entrada JSON para agregar una receta a un grupo.
 */
export type AddRecipeToGroupInput = {
  recipeId: number | string;
};
