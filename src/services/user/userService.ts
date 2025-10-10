import { createHttpClient, HttpClient } from "@/api";
import type { User } from "@/entities/User";
import type { RequestOptions } from "@/types/api/RequestOptions";
import type {
    AuthInput,
    AuthResponse, CreateUserInput, UpdateUserInput
} from "./types";

/**
 * Servicio para manejar las operaciones de usuario.
 * Endpoints:
 *  - POST   /api/addUser
 *  - POST   /api/authUser
 *  - PUT    /api/updateUser/:id
 *  - DELETE /api/deleteUser/:id
 */
export class UserService {
  private readonly http: HttpClient;

  constructor(http: HttpClient = createHttpClient()) {
    this.http = http;
  }

  /**
   * Crea un nuevo usuario.
   * @param input Datos del usuario a crear.
   * @param options Opciones opcionales (headers, cancelación, etc.)
   * @returns Usuario creado.
   */
  addUser = (input: CreateUserInput, options?: RequestOptions) =>
    this.http.post<User, CreateUserInput>("addUser", input, options);

  /**
   * Autentica un usuario (login).
   * @param input Credenciales del usuario.
   * @param options Opciones de solicitud.
   * @returns Token de autenticación y datos del usuario.
   */
  authUser = (input: AuthInput, options?: RequestOptions) =>
    this.http.post<AuthResponse, AuthInput>("authUser", input, options);

  /**
   * Actualiza los datos de un usuario por su ID.
   * @param id Identificador del usuario.
   * @param input Campos a modificar.
   * @param options Opciones de solicitud.
   * @returns Usuario actualizado.
   */
  updateUser = (id: number | string, input: UpdateUserInput, options?: RequestOptions) =>
    this.http.put<User, UpdateUserInput>(`updateUser/${id}`, input, options);

  /**
   * Elimina un usuario por ID.
   * @param id Identificador del usuario.
   * @param options Opciones de solicitud.
   */
  deleteUser = (id: number | string, options?: RequestOptions) =>
    this.http.delete<void>(`deleteUser/${id}`, options);
}

/**
 * Instancia singleton del servicio de usuarios.
 */
export const userService = new UserService();
