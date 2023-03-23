import { OrderItemType } from "types/orderItemType";

export interface Order {
  userId: string;
  tableNumber: number;
  products: OrderItemType[];
}