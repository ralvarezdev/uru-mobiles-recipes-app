import { createHttpClient, HttpClient } from "@/api";
import type { Group } from "@/entities/Group";
import type { RequestOptions } from "@/types/api/RequestOptions";
import type {
    AddRecipeToGroupInput,
    CreateGroupInput,
    GetGroupRecipesResponse,
    GetGroupResponse,
    UpdateGroupInput,
} from "./types";

/**
 * Servicio RESTful para manejar operaciones sobre Grupos y sus Recetas.
 *
 * Endpoints implementados:
 *  - GET    /groups/:groupId
 *  - POST   /groups
 *  - PUT    /groups/:groupId
 *  - DELETE /groups/:groupId
 *  - GET    /groups/:groupId/recipes
 *  - POST   /groups/:groupId/recipes
 *  - DELETE /groups/:groupId/recipes/:recipeId
 */
export class GroupService {
  private readonly http: HttpClient;

  constructor(http: HttpClient = createHttpClient()) {
    this.http = http;
  }

  /**
   * Obtiene un grupo por su ID.
   * @param groupId ID del grupo.
   * @param options Opciones de solicitud.
   */
  getGroup = (groupId: number | string, options?: RequestOptions) =>
    this.http.get<GetGroupResponse>(`groups/${groupId}`, undefined, options);

  /**
   * Crea un nuevo grupo.
   * @param input Datos del grupo (titulo, descripcion).
   * @param options Opciones de solicitud.
   */
  createGroup = (input: CreateGroupInput, options?: RequestOptions) =>
    this.http.post<Group, CreateGroupInput>(`groups`, input, options);

  /**
   * Actualiza un grupo existente.
   * @param groupId ID del grupo.
   * @param input Campos a actualizar.
   * @param options Opciones de solicitud.
   */
  updateGroup = (groupId: number | string, input: UpdateGroupInput, options?: RequestOptions) =>
    this.http.put<Group, UpdateGroupInput>(`groups/${groupId}`, input, options);

  /**
   * Elimina un grupo y sus recetas asociadas.
   * @param groupId ID del grupo.
   * @param options Opciones de solicitud.
   */
  deleteGroup = (groupId: number | string, options?: RequestOptions) =>
    this.http.delete<void>(`groups/${groupId}`, options);

  /**
   * Obtiene todas las recetas de un grupo.
   * @param groupId ID del grupo.
   * @param options Opciones de solicitud.
   */
  getRecipesByGroup = (groupId: number | string, options?: RequestOptions) =>
    this.http.get<GetGroupRecipesResponse>(`groups/${groupId}/recipes`, undefined, options);

  /**
   * Agrega una receta existente a un grupo.
   * @param groupId ID del grupo.
   * @param input JSON con el ID de la receta (ej: { recipeId: 10 }).
   * @param options Opciones de solicitud.
   */
  addRecipeToGroup = (
    groupId: number | string,
    input: AddRecipeToGroupInput,
    options?: RequestOptions
  ) => this.http.post<void, AddRecipeToGroupInput>(`groups/${groupId}/recipes`, input, options);

  /**
   * Remueve una receta del grupo (sin eliminar la receta).
   * @param groupId ID del grupo.
   * @param recipeId ID de la receta.
   * @param options Opciones de solicitud.
   */
  removeRecipeFromGroup = (
    groupId: number | string,
    recipeId: number | string,
    options?: RequestOptions
  ) => this.http.delete<void>(`groups/${groupId}/recipes/${recipeId}`, options);
}

/** Instancia singleton del servicio de grupos. */
export const groupService = new GroupService();
