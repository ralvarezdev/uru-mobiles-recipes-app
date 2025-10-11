
export interface Category {
  id: string;
  name: string;
  image: string;
  recipeCount?: number;
  
}


/**
 * Parámetros de consulta para obtener categorías.
 * El backend acepta un parámetro opcional "nombre".
 */
export type GetCategoriesParams = {
  /** Filtro opcional por nombre de categoría. */
  nombre?: string;
};

/**
 * Respuesta del endpoint de categorías.
 * Ajusta si tu backend devuelve una estructura diferente.
 */
export type GetCategoriesResponse = Category[];
