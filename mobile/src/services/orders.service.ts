import { initialOrders } from "../constants/orders";
import { OrderItemType } from "../types/order";

export const getOrders = async (): Promise<OrderItemType[]> => {
  // لاحقًا:
  // const res = await APIClient.get("/orders");
  // return res.data;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialOrders);
    }, 300);
  });
};