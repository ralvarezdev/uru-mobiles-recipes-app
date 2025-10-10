import { createHttpClient, HttpClient } from "@/api";
import type { Group } from "@/entities/Group";
import type { RequestOptions } from "@/types/api/RequestOptions";
import type { CreateGroupInput, GetGroupResponse, UpdateGroupInput } from "./types";

/**
 * Servicio para manejar operaciones de grupos.
 * Endpoints:
 *  - GET    /api/getGroup/:id
 *  - POST   /api/addGroup
 *  - PUT    /api/updateGroup/:id
 *  - DELETE /api/deleteGroup/:id
 */
export class GroupService {
  private readonly http: HttpClient;

  constructor(http: HttpClient = createHttpClient()) {
    this.http = http;
  }

  /**
   * Obtiene un grupo por su identificador.
   * @param id Identificador del grupo (route param).
   * @param options Opciones por solicitud.
   * @returns Grupo encontrado.
   */
  getGroup = (id: number | string, options?: RequestOptions) =>
    this.http.get<GetGroupResponse>(`getGroup/${id}`, undefined, options);

  /**
   * Crea un nuevo grupo.
   * @param input Datos JSON de creación (titulo, descripcion).
   * @param options Opciones por solicitud.
   * @returns Grupo creado.
   */
  addGroup = (input: CreateGroupInput, options?: RequestOptions) =>
    this.http.post<Group, CreateGroupInput>("addGroup", input, options);

  /**
   * Actualiza un grupo existente.
   * @param id Identificador del grupo (route param).
   * @param input Campos a actualizar (titulo, descripcion).
   * @param options Opciones por solicitud.
   * @returns Grupo actualizado.
   */
  updateGroup = (id: number | string, input: UpdateGroupInput, options?: RequestOptions) =>
    this.http.put<Group, UpdateGroupInput>(`updateGroup/${id}`, input, options);

  /**
   * Elimina un grupo y todas sus recetas.
   * @param id Identificador del grupo (route param).
   * @param options Opciones por solicitud.
   * @returns void
   */
  deleteGroup = (id: number | string, options?: RequestOptions) =>
    this.http.delete<void>(`deleteGroup/${id}`, options);
}

/** Instancia singleton de conveniencia. */
export const groupService = new GroupService();