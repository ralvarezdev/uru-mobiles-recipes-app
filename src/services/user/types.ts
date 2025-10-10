/**
 * Entrada para actualización de usuario (update parcial).
 */
 export type UpdateUserInput = Partial<{
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}>;
