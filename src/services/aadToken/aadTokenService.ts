// src/services/aadToken/aadTokenService.ts
import { assertEnv, ENV } from "@/config/env";
import type { QueryParams } from "@/types/api/QueryParams";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import type {
  AadToken,
  AadTokenOptions,
  AadTokenResponseRaw,
} from "./types";

/**
 * Obtiene y cachea tokens AAD desde API_URL_INTEGRATIONS (/GetTokenAad).
 * Cliente axios propio (sin interceptor) para evitar dependencias circulares.
 */
export class AadTokenService {
  private readonly storageKeyPrefix = "aad_token_cache::";
  private readonly memCache = new Map<string, AadToken>();

  /** Retorna un token válido (memoria → storage → API). */
  getToken = async (options?: AadTokenOptions): Promise<AadToken> => {
    assertEnv(); // mensajes claros si falta config

    const scope = options?.scope ?? ENV.AAD_SCOPE ?? null;
    console.log('scope',scope);
    const key = this.scopeKey(scope);
console.log('keyscope',key);
    const mem = this.memCache.get(key);
    if (mem && !this.isExpired(mem.expiresAt)) return mem;

    const stored = await this.loadFromStorage(key);
    if (stored && !this.isExpired(stored.expiresAt)) {
      this.memCache.set(key, stored);
      return stored;
    }

    const fresh = await this.fetchFromApi(scope, options?.skewMs);
    this.memCache.set(key, fresh);
    console.log(key,fresh);
    await this.saveToStorage(key, fresh);
    return fresh;
  };

  /** Fuerza refresh desde API. */
  refreshToken = async (options?: AadTokenOptions): Promise<AadToken> => {
    assertEnv();
    const scope = options?.scope ?? ENV.AAD_SCOPE ?? null;
    const key = this.scopeKey(scope);
    const fresh = await this.fetchFromApi(scope, options?.skewMs);
    this.memCache.set(key, fresh);
    await this.saveToStorage(key, fresh);
    return fresh;
  };

  private fetchFromApi = async (
    scope: string | null,
    skewMs: number = 60000
  ): Promise<AadToken> => {
    if (!ENV.API_URL_INTEGRATIONS) {
      throw new Error(
        "[AAD] API_URL_INTEGRATIONS no configurado. Revisa app.config.js o EXPO_PUBLIC_API_URL_INTEGRATIONS."
      );
    }

    const params: QueryParams | undefined = scope
      ? { scopeToken: scope }
      : undefined;

    const url = `${ENV.API_URL_INTEGRATIONS.replace(/\/+$/, "")}/api/PT/GetTokenAad`;
    console.log('integrationurl',url);
    const { data } = await axios.get<AadTokenResponseRaw>(url, { params });
    console.log('integrationurldata',data);
    if (!data) {
      throw new Error("[AAD] Respuesta vacía al solicitar token AAD.");
    }
    if (!data.access_token) {
      // Log útil para diagnosticar formato
      console.warn("[AAD] Respuesta inesperada:", JSON.stringify(data));
      throw new Error("[AAD] El backend no devolvió 'access_token'.");
    }

    return this.normalize(data, skewMs, scope ?? undefined);
  };

  private normalize = (
    raw: AadTokenResponseRaw,
    skewMs: number,
    scope?: string
  ): AadToken => {
    const accessToken = raw.access_token!;
    const tokenType = raw.token_type ?? "Bearer";
    // Prioriza expires_in; si falta, usa ext_expires_in; default 3600
    const expiresSec =
      (raw.expires_in ?? 0) > 0 ? raw.expires_in : raw.ext_expires_in || 3600;

    const expiresAt = Date.now() + Math.max(0, expiresSec * 1000 - (skewMs ?? 60000));
    return { accessToken, tokenType, scope, expiresAt };
  };

  private isExpired = (expiresAt: number) => Date.now() >= expiresAt;

  private scopeKey = (scope: string | null) =>
    scope ? `scope:${scope}` : "scope:default";

  private loadFromStorage = async (key: string): Promise<AadToken | null> => {
    const raw = await AsyncStorage.getItem(this.storageKeyPrefix + key);
    return raw ? (JSON.parse(raw) as AadToken) : null;
    };

  private saveToStorage = async (key: string, token: AadToken) =>
    AsyncStorage.setItem(this.storageKeyPrefix + key, JSON.stringify(token));
}

export const aadTokenService = new AadTokenService();
