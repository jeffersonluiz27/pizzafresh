import { ProductResponse } from "types/api/product";

export interface OrderItemType {
  product: ProductResponse;
  quantity: number;
  description?: string;
}