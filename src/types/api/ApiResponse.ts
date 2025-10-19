/**
 * Envoltura genérica usada por tu API:
 * { ok: boolean, response: T, trace: string }
 */
export type ApiResponse<T> = {
  ok: boolean;
  error?: Error;
  response?: T;
  trace?: string;
}

export interface Error {
  code: string;
  description?: string;
}
