import { auth } from "./auth";
import { order } from "./order";
import { product } from "./product";
import { table } from "./table";
import { user } from "./user";

export const endpoint = {
  baseUrl: "http://localhost:3334/",
  ...auth,
  ...user,
  ...order,
  ...table,
  ...product
};