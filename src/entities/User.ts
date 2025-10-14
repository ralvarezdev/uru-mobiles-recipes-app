/**
 * Entidad de dominio que representa a un usuario.
 * Esta interfaz define la estructura esperada desde el backend.
 */
export type User = {
  id: number | string;
  name: string;
  lastName: string;
  username: string;
  email: string;
};
