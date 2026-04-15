import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  FlatList,
} from "react-native";

import { getBanners } from "@/services/bannerService";

interface PromoBannerItem {
  id: string;
  image: string;
}

const PromoBanner = () => {
  const { width } = useWindowDimensions();

  const bannerWidth = width * 0.75;
  const bannerHeight = 170;

  const [banners, setBanners] = useState<PromoBannerItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBanners();
        setBanners(data.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <FlatList
      horizontal
      data={banners}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      renderItem={({ item }) => (
        <View
          style={[
            styles.card,
            { width: bannerWidth, height: bannerHeight },
          ]}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
      )}
    />
  );
};

export default PromoBanner;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 26,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});