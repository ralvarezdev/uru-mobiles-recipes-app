export type RequestOptions = {
  headers?: Record<string, string>;
  signal?: AbortSignal;

  /**
   * Si es true, NO agrega el token AAD automáticamente para esta request.
   * Útil para llamadas públicas o diagnósticos.
   */
  noAadAuth?: boolean;

  /**
   * Scope AAD específico para esta request.
   * Si no se especifica, usa el AAD_SCOPE del .env por defecto.
   */
  aadScope?: string;

  /**
   * Deshabilita reintentos automáticos (si tu HttpClient los implementa).
   */
  noRetry?: boolean;

  /**
   * Timeout en ms (si lo soportas en el cliente).
   */
  timeoutMs?: number;
};
