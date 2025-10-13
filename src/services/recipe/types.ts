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
  nombre: string;
  descripcion: string;
  tiempoPreparacion: number; // en minutos
  porciones: number;
  dificultad: string;        // si tienes un enum, cámbialo por ese tipo
};

/**
 * Entrada para actualizar una receta (parcial).
 */
export type UpdateRecipeInput = Partial<CreateRecipeInput>;

/**
 * Respuesta de listado de recetas (ajusta si tu backend envía otra estructura).
 */
export type GetRecipesResponse = Recipe[];
