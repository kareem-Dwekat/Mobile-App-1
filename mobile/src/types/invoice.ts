export interface InvoiceItemType {
    orderIds: string;
    items: number;
    date: string;
    amount: number;
    id: string;
    title: string;
    quantity: number;
    price: number;
    image: string;
    orderDate: string;
    invoiceId: string;
    paymentMethod: string;
    total: number;
    vat: number;
    status: string;
  }
  
  export interface InvoiceHeaderProps {
    onBack: () => void;
  }
  
  export interface InvoiceCardProps {
    item: InvoiceItemType;
  }