// src/config/env.ts
import Constants from "expo-constants";

type Extra = Record<string, any>;

// DEV/CLIs antiguos: extra puede venir de expoConfig o manifest
const EXTRA: Extra =
  (Constants as any).expoConfig?.extra ??
  (Constants as any).manifest?.extra ??
  {};

const fromProcess = {
  API_URL_COOKBOOK: process.env.EXPO_PUBLIC_API_BASE_URL,
  API_URL_INTEGRATIONS: process.env.EXPO_PUBLIC_API_URL_INTEGRATIONS,
  AAD_SCOPE: process.env.EXPO_PUBLIC_AAD_SCOPE,
};

export const ENV = {
  API_URL_COOKBOOK:
    fromProcess.API_URL_COOKBOOK ??
    (EXTRA.API_URL_COOKBOOK as string | undefined) ??
    "",

  API_URL_INTEGRATIONS:
    fromProcess.API_URL_INTEGRATIONS ??
    (EXTRA.API_URL_INTEGRATIONS as string | undefined) ??
    "",

  AAD_SCOPE:
    fromProcess.AAD_SCOPE ??
    (EXTRA.AAD_SCOPE as string | undefined) ??
    "",
};

/** Lanza un error con mensaje claro si falta alguna variable crítica. */
export const assertEnv = () => {
  const missing: string[] = [];
  if (!ENV.API_URL_COOKBOOK) missing.push("API_URL_COOKBOOK / EXPO_PUBLIC_API_BASE_URL");
  if (!ENV.API_URL_INTEGRATIONS)
    missing.push("API_URL_INTEGRATIONS / EXPO_PUBLIC_API_URL_INTEGRATIONS");
  if (!ENV.AAD_SCOPE) missing.push("AAD_SCOPE / EXPO_PUBLIC_AAD_SCOPE");
  if (missing.length) {
    throw new Error(
      `[ENV] Faltan variables: ${missing.join(
        ", "
      )}. Configúralas en app.config.js (extra) o como EXPO_PUBLIC_* y reinicia con 'expo start -c'.`
    );
  }
};
