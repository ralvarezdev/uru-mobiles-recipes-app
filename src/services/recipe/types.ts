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
};

/**
 * Entrada para actualizar una receta (parcial).
 */
export type UpdateRecipeInput = Partial<CreateRecipeInput>;

/**
 * Respuesta de listado de recetas (ajusta si tu backend envía otra estructura).
 */
export type GetRecipesResponse = Recipe[];
