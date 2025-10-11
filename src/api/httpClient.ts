import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

import { ApiConfig } from "@/types/api/ApiConfig";
import { QueryParams } from "@/types/api/QueryParams";
import { RequestOptions } from "@/types/api/RequestOptions";
import { normalizeError } from "./errors";
import { toQueryString } from "./queryString";

/**
 * Pausa la ejecución durante un tiempo determinado.
 */
const sleep = (ms: number): Promise<void> =>
  new Promise((res) => setTimeout(res, ms));

/**
 * Aplica un retraso exponencial con jitter entre reintentos.
 */
const backoffDelay = async (base: number, attempt: number): Promise<void> => {
  const jitter = 0.6 + Math.random() * 0.8;
  const delay = Math.round(base * Math.pow(2, attempt) * jitter);
  await sleep(delay);
};

/**
 * Cliente HTTP basado en Axios con soporte para interceptores, reintentos y cancelación.
 */
export class HttpClient {
  private instance: AxiosInstance;
  private config: Required<ApiConfig>;

  constructor(cfg: ApiConfig) {
    const retryDefaults = {
      retries: 2,
      baseDelayMs: 300,
      retryMethods: ["get" as const],
      shouldRetry: (error: AxiosError) => {
        const status = error.response?.status;
        return (
          !error.response ||
          status === 408 ||
          status === 429 ||
          (status !== undefined && status >= 500)
        );
      },
    };

    this.config = {
      baseURL: cfg.baseURL,
      timeoutMs: cfg.timeoutMs ?? 15000,
      getAccessToken: cfg.getAccessToken ?? null,
      onAuthError: cfg.onAuthError ?? (() => {}),
      enableLogging: cfg.enableLogging ?? false,
      retry: { ...retryDefaults, ...(cfg.retry ?? {}) },
    } as Required<ApiConfig>;

    this.instance = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeoutMs,
    });

    this.setupInterceptors();
  }

  /**
   * Configura interceptores de request y response.
   */
  private setupInterceptors = (): void => {
    this.instance.interceptors.request.use(
      async (req: InternalAxiosRequestConfig) => {
        const state = await NetInfo.fetch();
        if (!state.isConnected) {
          return Promise.reject({ message: "Sin conexión a Internet" });
        }

        const token =
          typeof this.config.getAccessToken === "function"
            ? await this.config.getAccessToken()
            : this.config.getAccessToken;

        if (token) {
          req.headers = (req.headers || {}) as any;
          (req.headers as any)["Authorization"] = `Bearer ${token}`;
        }

        return req;
      }
    );

    this.instance.interceptors.response.use(
      <T>(res: AxiosResponse<T>) => {
        if (this.config.enableLogging) {
          console.debug(
            "[API][OK]",
            res.config.method?.toUpperCase(),
            res.config.url,
            res.status
          );
        }
        return res;
      },
      async (error: AxiosError) => {
        if (this.config.enableLogging) {
          console.warn(
            "[API][ERR]",
            error.config?.method,
            error.config?.url,
            error.message
          );
        }

        const status = error.response?.status;
        if (status === 401 || status === 403) {
          this.config.onAuthError(status, normalizeError(error));
        }
        return Promise.reject(error);
      }
    );
  };

  /**
   * Ejecuta una solicitud con reintentos automáticos.
   */
  private requestWithRetry = async <T>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> => {
    const retry = this.config.retry;
    const maxRetries = options?.noRetry ? 0 : retry.retries ?? 0;
    const method = (config.method ?? "get").toLowerCase();
    const retryMethods = retry.retryMethods ?? [
      "get",
      "post",
      "put",
      "delete",
      "patch",
    ];
    const canRetry = retryMethods.includes(method as any);

    let attempt = 0;
    let lastError: unknown;

    while (true) {
      try {
        const res = await this.instance.request<T>({
          ...config,
          signal: options?.signal,
          headers: { ...(config.headers || {}), ...(options?.headers || {}) },
        });
        return res.data;
      } catch (err) {
        lastError = err;
        const axErr = err as AxiosError;

        const shouldRetry = retry.shouldRetry?.(axErr) ?? false;

        if (!canRetry || attempt >= maxRetries || !shouldRetry) {
          throw normalizeError(lastError);
        }

        const delayBase = retry.baseDelayMs ?? 300;
        await backoffDelay(delayBase, attempt);
        attempt++;
      }
    }
  };

  get = <T>(url: string, params?: QueryParams, options?: RequestOptions) =>
    this.requestWithRetry<T>(
      { url: url + toQueryString(params), method: "GET" },
      options
    );

  post = <T, B = unknown>(url: string, body?: B, options?: RequestOptions) =>
    this.requestWithRetry<T>({ url, method: "POST", data: body }, options);

  put = <T, B = unknown>(url: string, body?: B, options?: RequestOptions) =>
    this.requestWithRetry<T>({ url, method: "PUT", data: body }, options);

  patch = <T, B = unknown>(url: string, body?: B, options?: RequestOptions) =>
    this.requestWithRetry<T>({ url, method: "PATCH", data: body }, options);

  delete = <T>(url: string, options?: RequestOptions) =>
    this.requestWithRetry<T>({ url, method: "DELETE" }, options);
}

/**
 * Crea una instancia preconfigurada de HttpClient.
 */
export const createHttpClient = (config?: Partial<ApiConfig>): HttpClient =>
  new HttpClient({
    baseURL: config?.baseURL ?? "http://10.0.2.2:3000/api",
    timeoutMs: config?.timeoutMs ?? 15000,
    getAccessToken:
      config?.getAccessToken ??
      (async () => await AsyncStorage.getItem("auth_token")),
    onAuthError: config?.onAuthError ?? (() => {}),
    enableLogging: config?.enableLogging ?? __DEV__,
    retry: config?.retry,
  });
