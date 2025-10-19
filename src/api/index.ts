import Constants from "expo-constants";
import { HttpClient } from "./httpClient";

const { API_URL_BLOQUEO } = Constants.expoConfig?.extra ?? {};

export * from "./errors";
export * from "./httpClient";
export * from "./queryString";
export const http = new HttpClient({ baseURL: API_URL_BLOQUEO });