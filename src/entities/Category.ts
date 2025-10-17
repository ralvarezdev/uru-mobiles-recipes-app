/**
 * Entidad de dominio que representa una categoría.
 */
export type Category = {
  id: number;
  title: string;
  image: string;
  recipeCount?: number;
};
