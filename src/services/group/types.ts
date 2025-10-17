import type { Group } from "@/entities/Group";
import type { Recipe } from "@/entities/Recipe";

/**
 * Entrada JSON para crear un grupo.
 */
export type CreateGroupInput = {
  title: string;
  description: string;
};

/**
 * Entrada JSON para actualizar un grupo (puede ser parcial).
 */
export type UpdateGroupInput = Partial<CreateGroupInput>;

/**
 * Entrada JSON para agregar una receta a un grupo.
 */
export type AddRecipeToGroupInput = {
  recipeId: number | string;
};

/**
 * Respuesta al obtener un grupo.
 */
export type GetGroupResponse = Group;

/**
 * Respuesta al obtener las recetas de un grupo.
 */
export type GetGroupRecipesResponse = Recipe[];
