import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { CartItemType } from "../types/cart";
import { OrderItemType } from "../types/order";
import { PaymentMethod, ShippingAddress } from "../types/payment";

const ORDERS_COLLECTION = "orders";

type CreateOrderInput = {
  userId: string;
  cartItems: CartItemType[];
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
};

const getOrderDate = () => new Date().toISOString().slice(0, 10);

export const calculateCartTotal = (items: CartItemType[]) =>
  items.reduce((sum, item) => sum + item.price * item.qty, 0);

export const createOrder = async ({
  userId,
  cartItems,
  paymentMethod,
  shippingAddress,
}: CreateOrderInput): Promise<OrderItemType> => {
  const createdAt = new Date().toISOString();
  const orderId = Date.now().toString();
  const products = cartItems.map((item) => ({ ...item }));
  const totalItems = products.reduce((sum, item) => sum + item.qty, 0);
  const amount = calculateCartTotal(products);

  const order: OrderItemType = {
    id: orderId,
    userId,
    date: getOrderDate(),
    items: totalItems,
    amount,
    status: "Pending",
    products,
    paymentMethod,
    shippingAddress,
    createdAt,
  };

  await setDoc(doc(db, ORDERS_COLLECTION, orderId), order);

  return order;
};

export const subscribeToOrders = (
  userId: string,
  callback: (orders: OrderItemType[]) => void
) => {
  const ordersQuery = query(
    collection(db, ORDERS_COLLECTION),
    where("userId", "==", userId)
  );

  return onSnapshot(
    ordersQuery,
    (snapshot) => {
      const orders = snapshot.docs
        .map((orderDoc) => orderDoc.data() as OrderItemType)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

      callback(orders);
    },
    (error) => {
      console.error("Error subscribing to orders:", error);
      callback([]);
    }
  );
};
