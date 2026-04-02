import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import AddressHeader from "../components/AddressHeader";
import AddressCard from "../components/AddressCard";
import { useAddresses } from "../hooks/useAddresses";
import { COLORS } from "../constants/colors";

export default function ShippingAddressScreen() {
  const { addresses, setActiveAddress, deleteAddress } = useAddresses();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AddressHeader title="Shipping Address" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {addresses.map((item) => (
            <AddressCard
              key={item.id}
              address={item}
              onSetActive={setActiveAddress}
              onDelete={deleteAddress}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  content: {
    paddingBottom: 30,
  },
});