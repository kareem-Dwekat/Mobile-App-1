export type MenuIconName =
  | "receipt-outline"
  | "card-outline"
  | "heart-outline"
  | "location-outline"
  | "person-outline"
  | "log-out-outline"
  | "chevron-forward"
  | "chevron-back"
  | "pencil";

export interface MenuItemData {
  title: string;
  icon: MenuIconName;
  onPress?: () => void;
}

export interface MenuItemProps {
  title: string;
  icon: MenuIconName;
  onPress?: () => void;
}

export interface ProfileHeaderProps {
  onBackPress: () => void;
}

export interface ProfileImageProps {
  imageUri?: string;
  name?: string;
  onEditPress?: () => void;
}