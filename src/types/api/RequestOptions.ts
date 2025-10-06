/**
 * Opciones adicionales que pueden acompañar cualquier solicitud HTTP.
 */
export type RequestOptions = {
  /**
   * Permite cancelar la solicitud con un `AbortController`.
   */
  signal?: AbortSignal;

  /**
   * Encabezados personalizados que se enviarán en esta petición.
   */
  headers?: Record<string, string>;

  /**
   * Si es `true`, evita que el cliente intente reintentos automáticos para esta solicitud.
   */
  noRetry?: boolean;
};
