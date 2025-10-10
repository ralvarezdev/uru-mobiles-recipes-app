import { createHttpClient, HttpClient } from "@/api";
import type { QueryParams } from "@/types/api/QueryParams";
import type { RequestOptions } from "@/types/api/RequestOptions";
import type { GetCategoriesParams, GetCategoriesResponse } from "./types";

/**
 * Servicio para manejar operaciones de categorías.
 * Endpoint cubierto:
 *  - GET /api/getCategories
 */
export class CategoryService {
  private readonly http: HttpClient;

  constructor(http: HttpClient = createHttpClient()) {
    this.http = http;
  }

  /**
   * Obtiene la lista de categorías (con filtro opcional por nombre).
   * @param params Parámetros de consulta (por ejemplo, { nombre: "Bebidas" })
   * @param options Opciones por solicitud (headers, cancelación, noRetry, etc.)
   * @returns Lista de categorías.
   */
  getCategories = (
    params?: GetCategoriesParams & QueryParams,
    options?: RequestOptions
  ) => this.http.get<GetCategoriesResponse>("getCategories", params, options);
}

/**
 * Instancia singleton del servicio de categorías.
 */
export const categoryService = new CategoryService();
