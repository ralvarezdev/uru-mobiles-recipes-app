/**
 * Entidad de dominio que representa un grupo.
 */
export type Group = {
  id: number;
  title: string;
  recipesCount?: number;
  author: string;
};
