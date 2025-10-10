import type { Group } from "@/entities/Group";

/**
 * Entrada JSON para crear un grupo.
 */
export type CreateGroupInput = {
  titulo: string;
  descripcion: string;
};

/**
 * Entrada JSON para actualizar un grupo.
 * (Permite actualización parcial).
 */
export type UpdateGroupInput = Partial<CreateGroupInput>;

/**
 * Respuesta de obtener un grupo por id.
 * Ajusta si tu backend devuelve más campos.
 */
export type GetGroupResponse = Group;
