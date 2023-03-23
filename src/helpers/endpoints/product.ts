import { endpoint } from "helpers/endpoints";

export const product = {
  createProduct: () => `${endpoint.baseUrl}/product`,
  listProducts: () => `${endpoint.baseUrl}/product`,
  productbyId: (id: string) => `${endpoint.baseUrl}/product/${id}`,
};