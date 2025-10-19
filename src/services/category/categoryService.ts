import { http } from "@/api";
import type { QueryParams } from "@/types/api/QueryParams";
import type { RequestOptions } from "@/types/api/RequestOptions";
import type { GetCategoriesParams, GetCategoriesResponse } from "./types";

/** Categorías (GET /categories?nombre=). */
export class CategoryService {
  getCategories = (params?: GetCategoriesParams & QueryParams, options?: RequestOptions) =>
    http.get<GetCategoriesResponse>("/api/Category/GetCategories", params, options);
}

export const categoryService = new CategoryService();
