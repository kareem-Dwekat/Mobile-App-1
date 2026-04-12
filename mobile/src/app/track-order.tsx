import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

export default function TrackOrderScreen() {
  const deliveryLocation = {
    latitude: 32.2211,
    longitude: 35.2544,
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="#111" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Track Order</Text>
        </View>

        <View style={styles.productCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
            }}
            style={styles.productImage}
          />

          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>Leather Jacket</Text>
            <Text style={styles.productPrice}>$499</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Delivery Location</Text>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: deliveryLocation.latitude,
              longitude: deliveryLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={deliveryLocation} title="Delivery Location" />
          </MapView>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={22} color="#F97316" />
            <View style={styles.textBox}>
              <Text style={styles.label}>Estimated Delivery</Text>
              <Text style={styles.value}>07 Feb 2026, 09:34 AM</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Ionicons name="location-outline" size={22} color="#F97316" />
            <View style={styles.textBox}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>
                45 George Street, Geelong, Victoria, Australia
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Ionicons name="cube-outline" size={22} color="#F97316" />
            <View style={styles.textBox}>
              <Text style={styles.label}>Status</Text>
              <Text style={styles.value}>Pending</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    marginBottom: 20,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#E5E7EB",
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  mapContainer: {
    height: 220,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#E5E7EB",
  },
  map: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    gap: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textBox: {
    flex: 1,
    marginLeft: 12,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 22,
  },
});