import { InvoiceItemType } from "../types/invoice";

export const invoiceData: InvoiceItemType = {
  id: "1",
  title: "Classic Cotton Oxford Shirt",
  quantity: 1,
  price: 200,
  image:
    "https://images.unsplash.com/photo-1593032465171-8b1c2d0fcd0c?q=80&w=800",
  orderDate: "Sat, 07 Feb 2026",
  invoiceId: "INV-51",
  paymentMethod: "stripe",
  total: 200,
  vat: 0,
  status: "paid",
};