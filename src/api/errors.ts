import { ApiError } from "@/types/api/ApiError";
import axios, { AxiosError } from "axios";

/**
 * Convierte cualquier error de Axios en un error normalizado.
 */
export const normalizeError = (err: unknown): ApiError => {
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<any>;
    const status = ax.response?.status;
    const payload = (ax.response?.data ?? {}) as any;
    const code = payload.code ?? payload.error?.code;
    const message = payload.message || payload.error?.message || ax.message || "Unknown error";
    return { status, code, message, details: payload.details, raw: err };
  }
  return { message: (err as Error)?.message ?? "Unknown error", raw: err };
};
