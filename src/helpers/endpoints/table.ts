import { endpoint } from "helpers/endpoints";

export const table = {
  createTable: () => `${endpoint.baseUrl}/table`,
  listTables: () => `${endpoint.baseUrl}/table`,
  tablebyId: (id: string) => `${endpoint.baseUrl}/table/${id}`,
};