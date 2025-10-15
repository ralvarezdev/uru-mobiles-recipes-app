/**
 * Entrada para actualización de usuario (update parcial).
 */
 export type UpdateUserInput = Partial<{
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
}>;
