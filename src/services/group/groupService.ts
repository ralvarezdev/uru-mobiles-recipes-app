import { http } from "@/api";
import type { Group } from "@/entities/Group";
import type { RequestOptions } from "@/types/api/RequestOptions";
import type {
  CreateGroupInput,
  GetGroupResponse,
  GetGroupsByUserResponse,
  GetGroupsResponse,
  UpdateGroupInput
} from "./types";

/** Grupos y su relación con recetas (REST real). */
export class GroupService {
  getGroups = (options?: RequestOptions) =>
    http.get<GetGroupsResponse>(`/api/Group/GetGroups`, undefined, options);

  getGroupsByUser = (author: string, options?: RequestOptions) =>
      http.get<GetGroupsByUserResponse>(`/api/Recipe/GetRecipesByUser/${author}`, options);

  getGroup = (groupId: number | string, options?: RequestOptions) =>
    http.get<GetGroupResponse>(`/api/Group/GetGroup/${groupId}`, undefined, options);

  createGroup = (input: CreateGroupInput, options?: RequestOptions) =>
    http.post<Group, CreateGroupInput>(`/api/Group/PostGroup`, input, options);

  updateGroup = (groupId: number | string, input: UpdateGroupInput, options?: RequestOptions) =>
    http.put<Group, UpdateGroupInput>(`/api/Group/PutGroup/${groupId}`, input, options);

  deleteGroup = (groupId: number | string, options?: RequestOptions) =>
    http.delete<void>(`/api/Group/DeleteGroup/${groupId}`, options);
}

export const groupService = new GroupService();
