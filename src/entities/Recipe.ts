/**
 * Entidad de dominio que representa una receta.
 */
export type Recipe = {
  id: string;
  image: string;
  title: string;
  description?: string;
  prepareTime: number;
  unitPrepareTime: string;
  portions: number;
  categoryId: number;
  ingredients: string; 
  steps: string;
};
