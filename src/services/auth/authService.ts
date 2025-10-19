import { http } from "@/api";
import type { User } from "@/entities/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  AuthTokens,
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
} from "./types";

const ACCESS_KEY = "auth_token";
const REFRESH_KEY = "refresh_token";

/** Autenticación: login/register, tokens y sesión. */
export class AuthService {
  register = async (input: RegisterInput): Promise<RegisterResponse> => {
    const res = await http.post<LoginResponse, RegisterInput>(
      "/api/Auth/Register",
      input
    );
    // await this.storeTokens(res.tokens);
    await AsyncStorage.setItem(
      "authenticatedUser",
      JSON.stringify(res)
    );
    return res;
  };

  login = async (input: LoginInput): Promise<LoginResponse> => {
    const res = await http.post<User, LoginInput>(
      "/api/Auth/Login",
      input
    );
    // await this.storeTokens(res.tokens);
    await AsyncStorage.setItem(
      "authenticatedUser",
      JSON.stringify(res)
    );
    return res;
  };

  me = async (): Promise<User> => {
    const jsonUser = await AsyncStorage.getItem("authenticatedUser");

    if (!jsonUser) {
      throw new Error("No hay respuesta");
    }

    const user = JSON.parse(jsonUser);
    return user;
  };
  // me = async (): Promise<User> => http.get<User>("/api/Auth/Me");

  refreshToken = async (): Promise<AuthTokens> => {
    const refresh = await AsyncStorage.getItem(REFRESH_KEY);
    if (!refresh) throw new Error("No refresh token");
    const res = await http.post<AuthTokens, { refreshToken: string }>(
      "refresh",
      { refreshToken: refresh },
      { noRetry: true }
    );
    await this.storeTokens(res);
    return res;
  };

  logout = async () => {
    AsyncStorage.multiRemove([ACCESS_KEY, REFRESH_KEY, "userAuthenticated"])
  };

  private readonly storeTokens = async (tokens: AuthTokens) => {
    await AsyncStorage.setItem(ACCESS_KEY, tokens.accessToken);
    if (tokens.refreshToken)
      await AsyncStorage.setItem(REFRESH_KEY, tokens.refreshToken);
  };
}

export const authService = new AuthService();
