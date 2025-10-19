/**
 * Respuesta cruda del endpoint /GetTokenAad (C#).
 */
export type AadTokenResponseRaw = {
  access_token: string | null;
  token_type: string | null;
  ext_expires_in: number;
  expires_in: number;
  scope?: string;
};

/**
 * Token AAD normalizado para el cliente RN.
 */
export type AadToken = {
  accessToken: string;
  tokenType?: string;
  scope?: string;
  /** Epoch millis de expiración (con skew aplicado). */
  expiresAt: number;
};

/**
 * Opciones para obtener el token.
 */
export type AadTokenOptions = {
  /** Scope a solicitar; si no se pasa, se usa .env (AAD_SCOPE). */
  scope?: string | null;
  /** Skew de seguridad, ms (default 60s). */
  skewMs?: number;
};
