import { createHttpClient, HttpClient } from "@/api";
import { User } from "@/entities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  AuthTokens,
  LoginInput,
  LoginResponse,
  RegisterInput
} from "./types";

const ACCESS_KEY = "auth_token";
const REFRESH_KEY = "refresh_token";

/**
 * Servicio de autenticación: sesión, tokens y usuario autenticado.
 */
export class AuthService {
  private readonly http: HttpClient;

  constructor(http: HttpClient = createHttpClient()) {
    this.http = http;
  }

  /**
   * Registra un nuevo usuario (signup).
   * Endpoint: POST /api/addUser
   */
  register = async (input: RegisterInput): Promise<LoginResponse> => {
    const res = await this.http.post<LoginResponse, RegisterInput>("addUser", input);
    await this.storeTokens(res.tokens);
    return res;
  };

  /**
   * Inicia sesión con credenciales.
   * Endpoint: POST /api/authUser
   */
  login = async (input: LoginInput): Promise<LoginResponse> => {
    const res = await this.http.post<LoginResponse, LoginInput>("authUser", input);
    await this.storeTokens(res.tokens);
    return res;
  };

  /**
   * Cierra sesión eliminando los tokens almacenados.
   */
  logout = async (): Promise<void> => {
    await AsyncStorage.multiRemove([ACCESS_KEY, REFRESH_KEY]);
  };

  /**
   * Obtiene el usuario autenticado.
   * Ajusta el endpoint si tu backend usa otro.
   * Endpoint sugerido: GET /api/me
   */
  me = async (): Promise<User> => {
    return this.http.get<User>("me");
  };

  /**
   * Refresca el token de acceso.
   * Ajusta el endpoint si tu backend usa otro.
   * Endpoint sugerido: POST /api/refresh
   */
  refreshToken = async (): Promise<AuthTokens> => {
    const refresh = await AsyncStorage.getItem(REFRESH_KEY);
    if (!refresh) throw new Error("No refresh token");

    const res = await this.http.post<AuthTokens, { refreshToken: string }>(
      "refresh",
      { refreshToken: refresh },
      { noRetry: true }
    );

    await this.storeTokens(res);
    return res;
  };

  /**
   * Persiste tokens de autenticación.
   */
  private storeTokens = async (tokens: AuthTokens): Promise<void> => {
    await AsyncStorage.setItem(ACCESS_KEY, tokens.accessToken);
    if (tokens.refreshToken) {
      await AsyncStorage.setItem(REFRESH_KEY, tokens.refreshToken);
    }
  };
}

/**
 * Singleton de conveniencia del servicio de autenticación.
 */
export const authService = new AuthService();
