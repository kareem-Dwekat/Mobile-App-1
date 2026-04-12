import { PaymentHistoryItemType } from "../types/paymentHistory";

export const paymentHistoryData: PaymentHistoryItemType[] = [
  {
    id: "1",
    orderIds: "#160",
    items: 5,
    amount: 2320,
    status: "paid",
  },
  {
    id: "2",
    orderIds: "#159",
    items: 1,
    amount: 200,
    status: "paid",
    paymentMethod: "stripe",
    showActions: true,
  },
  {
    id: "3",
    orderIds: "#157, #158",
    items: 2,
    amount: 628,
    status: "paid",
  },
  {
    id: "4",
    orderIds: "#155, #156",
    items: 2,
    amount: 528,
    status: "paid",
  },
  {
    id: "5",
    orderIds: "#154",
    items: 2,
    amount: 1151,
    status: "paid",
  },
  {
    id: "6",
    orderIds: "#153",
    items: 1,
    amount: 718,
    status: "paid",
  },
  {
    id: "7",
    orderIds: "#152",
    items: 1,
    amount: 400,
    status: "paid",
  },
];