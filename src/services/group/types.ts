import type { Group } from "@/entities/Group";
import type { Recipe } from "@/entities/Recipe";

/**
 * Entrada JSON para crear un grupo.
 */
export type CreateGroupInput = {
  title: string;
  description: string;
  author: string;
};

/**
 * Entrada JSON para actualizar un grupo (puede ser parcial).
 */
export type UpdateGroupInput = {
  id: number;
  title: string;
  description: string;
  author: string;
};

/**
 * Respuesta al obtener un grupo.
 */
export type GetGroupResponse = Group;

/**
 * Respuesta al obtener una lista de grupos.
 */
export type GetGroupsResponse = Group[];

/**
 * Respuesta al obtener una lista de grupos por usuario.
 */
export type GetGroupsByUserResponse = Group[];

/**
 * Respuesta al obtener las recetas de un grupo.
 */
export type GetGroupRecipesResponse = Recipe[];
