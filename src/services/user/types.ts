import type { User } from "@/entities/User";

/**
 * Entrada para crear usuario.
 */
export type CreateUserInput = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
};

/**
 * Entrada para autenticación.
 */
export type AuthInput = {
  email: string;
  password: string;
};

/**
 * Respuesta de autenticación (token + usuario).
 */
export type AuthResponse = {
  token: string;
  user: User;
};

/**
 * Entrada para actualizar usuario.
 */
export type UpdateUserInput = Partial<CreateUserInput>;
