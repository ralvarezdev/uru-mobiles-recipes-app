/**
 * Entidad de dominio que representa a un usuario.
 * Esta interfaz define la estructura esperada desde el backend.
 */
export type User = {
  id: number | string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
};
