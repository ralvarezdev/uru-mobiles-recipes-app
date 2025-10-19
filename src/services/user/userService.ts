import { http } from "@/api";
import type { User } from "@/entities/User";
import type { RequestOptions } from "@/types/api/RequestOptions";
import type { UpdateUserInput } from "./types";

/** CRUD de usuarios (recurso). */
export class UserService {
  // createUser = (input: CreateUserAdminInput, options?: RequestOptions) =>
  //   http.post<User, CreateUserAdminInput>("addUser", input, options);

  updateUser = (id: number, input: UpdateUserInput, options?: RequestOptions) =>
    http.put<User, UpdateUserInput>(`/api/User/PutUser/${id}`, input, options);

  deleteUser = (id: number, options?: RequestOptions) =>
    http.delete<void>(`/api/User/DeleteUser/${id}`, options);

  getUser = (id: number, options?: RequestOptions) =>
    http.get<User>(`/api/User/GetUser/${id}`, undefined, options);

  getUsers = (options?: RequestOptions) =>
    http.get<User[]>(`/api/User/GetUsers`, undefined, options);
}

export const userService = new UserService();
