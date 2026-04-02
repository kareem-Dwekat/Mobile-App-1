export type ProductFormData = {
    productName: string;
    description: string;
    price: string;
    stock: string;
    category: string;
    brand: string;
  };
  
  export type ProductFormErrors = Partial<Record<keyof ProductFormData, string>>;
  
  export type StepItem = {
    id: number;
    label: string;
  };