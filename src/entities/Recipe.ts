/**
 * Entidad de dominio que representa una receta.
 */
export type Recipe = {
  id: number | string;
  nombre: string;
  descripcion?: string;
  tiempoPreparacion?: number; 
  porciones?: number;
  dificultad?: string;
  imagenUrl?: string;
};
