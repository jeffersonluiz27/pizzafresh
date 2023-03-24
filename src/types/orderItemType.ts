import { ProductResponse } from "./products";

export interface OrderItemType {
  product: ProductResponse;
  quantity: number;
  description?: string;
}