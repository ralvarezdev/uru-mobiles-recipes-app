/**
 * Respuesta paginada genérica del backend.
 *
 * @typeParam T - Tipo de entidad en el array `data`.
 */
export type Paginated<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
};
