import { ENV } from "@/config/env";
import { aadTokenService } from "@/services/aadToken";
import { ApiResponse } from "@/types/api/ApiResponse";
import type { RequestOptions } from "@/types/api/RequestOptions";
// import { AAD_SCOPE, API_URL_BLOQUEO } from "@env";
import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// import Constants from "expo-constants";

// const { API_URL_COOKBOOK, AAD_SCOPE } = Constants.expoConfig?.extra ?? {};

/**
 * Cliente HTTP principal para el backend protegido (API_BASE_URL).
 * Inyecta automáticamente el token AAD en cada request.
 */
export class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({ baseURL: ENV.API_URL_COOKBOOK });

    // 🟦 Interceptor de REQUEST (inyecta headers y token)
    this.instance.interceptors.request.use(async (cfg) => {
      const opts = (cfg as AxiosRequestConfig & { _options?: RequestOptions })._options;
      const headers =
        cfg.headers && typeof (cfg.headers as any).set === "function"
          ? (cfg.headers as AxiosHeaders)
          : new AxiosHeaders(cfg.headers);

      if (!opts?.noAadAuth && !headers.has("Authorization")) {
        const aad = await aadTokenService.getToken({
          scope: opts?.aadScope ?? ENV.AAD_SCOPE,
        });
        headers.set("Authorization", `Bearer ${aad.accessToken}`);
      }

      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      cfg.headers = headers;

      // 🧠 Log básico (puedes quitarlo en prod)
      console.log("➡️ Request:", cfg.method?.toUpperCase(), `${cfg.baseURL}${cfg.url}`);
      return cfg;
    });

    // 🟥 Interceptor de RESPONSE (manejo de red + logs)
    this.instance.interceptors.response.use(
      // ✅ Éxito
      (response: AxiosResponse) => {
        console.log("✅ Response:", response.status, response.config.url);
        return response;
      },
      // ❌ Error
      (error: AxiosError) => {
        // Detecta errores de red (sin respuesta del servidor)
        if (error.message === "Network Error" || !error.response) {
          console.error("🌐 Network Error:", error.message);
          // Puedes lanzar un error personalizado o mostrar alerta
          return Promise.reject(
            new Error("Error de red: no se pudo conectar con el servidor.")
          );
        }

        const { status, data, config } = error.response!;
        console.error(`❌ HTTP ${status} en ${config.url}`, data);

        // Manejo específico por código
        switch (status) {
          case 401:
            console.warn("🔐 Token expirado o no autorizado");
            // opcional: refrescar token o redirigir a login
            break;
          case 403:
            console.warn("🚫 Acceso prohibido");
            break;
          case 404:
            console.warn("🔍 Recurso no encontrado");
            break;
          case 500:
            console.error("💥 Error interno del servidor");
            break;
          default:
            console.warn("⚠️ Error desconocido:", status);
            break;
        }

        // Devuelve el error para que el caller lo maneje
        return Promise.reject(error);
      }
    );
  }

  private withOptions = (cfg?: AxiosRequestConfig, opts?: RequestOptions) => ({
    ...(cfg || {}),
    _options: opts,
  });

  get = async <T>(url: string, params?: Record<string, any>, opts?: RequestOptions): Promise<T> => {
    console.log('url, params, opts',url, params, opts);
    try {
      const {data} = await this.instance.get<ApiResponse<T>>(url, this.withOptions({ params }, opts));
      console.log('data',data);
      return data.response!;
    } catch (error) {
      console.error(error);
      return null as T;
    }

  }

  post = async <T, B = unknown>(url: string, body?: B, opts?: RequestOptions): Promise<T> => {
    const {data} = await this.instance.post<ApiResponse<T>>(url, body, this.withOptions({}, opts));
    return data.response!;
  }

  put = async <T, B = unknown>(url: string, body?: B, opts?: RequestOptions): Promise<T> => {
    const {data} = await this.instance.put<ApiResponse<T>>(url, body, this.withOptions({}, opts));
    return data.response!;
  }

  delete = async <T>(url: string, opts?: RequestOptions): Promise<T> =>{
    const {data} = await this.instance.delete<ApiResponse<T>>(url, this.withOptions({}, opts));
    return data.response!;
  }
}
