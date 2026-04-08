export interface CategoryItemType {
    id: string;
    name: string;
    icon: string;
  }
  
  export interface ProductItemType {
    id: string;
    title: string;
    image: string;
    price: number;
    oldPrice?: number;
    rating: number;
    reviews: number;
  }