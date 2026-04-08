import React from "react";
import { View, Image, StyleSheet } from "react-native";

const PromoBanner = () => {
  return (
    <View style={styles.row}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
        }}
        style={styles.largeBanner}
      />
      <View style={styles.smallBanner} />
    </View>
  );
};

export default PromoBanner;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 26,
  },
  largeBanner: {
    flex: 1,
    height: 170,
    borderRadius: 20,
    marginRight: 14,
  },
  smallBanner: {
    width: 70,
    height: 170,
    borderRadius: 20,
    backgroundColor: "#F8C9CF",
  },
});