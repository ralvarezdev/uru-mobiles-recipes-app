/**
 * Entidad de dominio que representa un grupo.
 */
export type Group = {
  id: string;
  title: string;
  recipesCount?: number;
  author: string;
};
