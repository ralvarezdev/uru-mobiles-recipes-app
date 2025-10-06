export type ApiError = {
  status?: number;
  code?: string;
  message: string;
  details?: unknown;
  raw?: unknown;
};
