export interface CategorySubItemType {
    id: string;
    title: string;
  }
  
  export interface CategoryItemType {
    id: string;
    title: string;
    icon: string;
    children?: CategorySubItemType[];
  }