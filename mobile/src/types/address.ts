export type Address = {
  id: string;
  title: string;
  country: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  zipCode: string;
  isActive: boolean;
};