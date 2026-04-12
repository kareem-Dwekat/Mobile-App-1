export interface PaymentHistoryItemType {
    id: string;
    orderIds: string;
    items: number;
    amount: number;
    status: string;
    paymentMethod?: string;
    showActions?: boolean;
  }
  
  export interface PaymentHistoryCardProps {
    item: PaymentHistoryItemType;
    onViewInvoice?: () => void;
    onPrintInvoice?: () => void;
  }
  
  export interface PaymentHistoryHeaderProps {
    onBack: () => void;
  }