import { User } from "@/entities";

export type LoginInput = { email: string; password: string };

export type RegisterInput = User & {
  password: string;
};

export type AuthTokens = { accessToken: string; refreshToken?: string };

// export type AuthUser = User;

export type LoginResponse = User;
export type RegisterResponse = User;

// export type LoginResponse = {
//   tokens: AuthTokens;
//   user: User;
// };
