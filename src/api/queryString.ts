import { QueryParams } from "@/types/api/QueryParams";

/**
 * Convierte un objeto en cadena de consulta (?param=value).
 */
export const toQueryString = (params?: QueryParams): string => {
  if (!params) return "";
  const parts: string[] = [];
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  }
  return parts.length ? `?${parts.join("&")}` : "";
};
