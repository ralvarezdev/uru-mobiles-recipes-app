import { User } from "@/entities";

export type LoginInput = { email: string; password: string };

export type RegisterInput = User & {
  password: string;
};

export type AuthTokens = { accessToken: string; refreshToken?: string };

export type AuthUser = {
  id: number | string;
  nombre: string;
  apellido: string;
  email: string;
};

export type LoginResponse = {
  tokens: AuthTokens;
  user: AuthUser;
};
