export interface CategoryItemType {
  id: string;
  title: string;
  icon: string;
}

export interface SubCategoryItemType {
  id: string;
  title: string;
  parentId: string;
}