import React from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  ListRenderItem,
} from "react-native";

interface PromoBannerItem {
  id: string;
  image: string;
}

interface Props {
  banners?: PromoBannerItem[];
}

const fallbackBanners: PromoBannerItem[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
  },
];

const PromoBanner = ({ banners = fallbackBanners }: Props) => {
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;

  const bannerWidth = width - 32;
  const bannerHeight = isSmallDevice ? 145 : 170;

  const renderItem: ListRenderItem<PromoBannerItem> = ({ item }) => (
    <View style={[styles.card, { width: bannerWidth, height: bannerHeight }]}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <FlatList
      horizontal
      data={banners}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToAlignment="start"
      decelerationRate="fast"
      contentContainerStyle={styles.listContent}
    />
  );
};

export default PromoBanner;

const styles = StyleSheet.create({
  listContent: {
    marginTop: 20,
    marginBottom: 26,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: "#E5E7EB",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});