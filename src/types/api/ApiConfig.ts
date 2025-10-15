import type { AxiosError } from "axios";
import type { ApiError } from "./ApiError";

/**
 * Configuración global del cliente API.
 */
export type ApiConfig = {
  /**
   * URL base de la API (por ejemplo: "https://api.miapp.com/v1").
   */
  baseURL: string;

  /**
   * Tiempo máximo de espera para cada petición en milisegundos.
   */
  timeoutMs?: number;

  /**
   * Función que retorna el token de acceso si existe.
   */
  getAccessToken?: () => Promise<string | null> | string | null;

  /**
   * Función que se ejecuta automáticamente cuando hay errores 401 o 403.
   */
  onAuthError?: (status: number, error: ApiError) => void;

  /**
   * Activa o desactiva logs de red en consola.
   */
  enableLogging?: boolean;

  /**
   * Configuración para reintentos automáticos.
   */
  retry?: {
    /**
     * Número máximo de reintentos por petición.
     */
    retries?: number;

    /**
     * Retraso base en milisegundos para el backoff exponencial.
     */
    baseDelayMs?: number;

    /**
     * Métodos HTTP para los que se permiten reintentos.
     */
    retryMethods?: Array<"get" | "put" | "delete" | "patch" | "post">;

    /**
     * Función que decide si se debe reintentar en función del error.
     */
    shouldRetry?: (error: AxiosError) => boolean;
  };
};
