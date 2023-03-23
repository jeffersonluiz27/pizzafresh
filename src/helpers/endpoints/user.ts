import { endpoint } from "helpers/endpoints";

export const user = {
  createUser: () => `${endpoint.baseUrl}/user`,
  listUsers: () => `${endpoint.baseUrl}/user`,
  userbyId: (id: string) => `${endpoint.baseUrl}/user/${id}`,
};