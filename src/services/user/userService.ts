import { createHttpClient, HttpClient } from "@/api";
import type { User } from "@/entities/User";
import type { RequestOptions } from "@/types/api/RequestOptions";
import type { UpdateUserInput } from "./types";

/**
 * Servicio de usuarios (solo CRUD del recurso).
 * No maneja autenticación ni tokens.
 *
 * Endpoints cubiertos:
 *  - PUT    /api/updateUser/:id
 *  - DELETE /api/deleteUser/:id
 */
export class UserService {
  private readonly http: HttpClient;

  constructor(http: HttpClient = createHttpClient()) {
    this.http = http;
  }

  /**
   * Actualiza los datos de un usuario por su ID.
   * Endpoint: PUT /api/updateUser/:id
   */
  updateUser = (id: number | string, input: UpdateUserInput, options?: RequestOptions) =>
    this.http.put<User, UpdateUserInput>(`updateUser/${id}`, input, options);

  /**
   * Elimina un usuario por ID.
   * Endpoint: DELETE /api/deleteUser/:id
   */
  deleteUser = (id: number | string, options?: RequestOptions) =>
    this.http.delete<void>(`deleteUser/${id}`, options);
}

/**
 * Singleton de conveniencia del servicio de usuarios.
 */
export const userService = new UserService();
