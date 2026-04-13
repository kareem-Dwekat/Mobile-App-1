import React, { useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AddressHeader from "../components/AddressHeader";
import AddressCard from "../components/AddressCard";
import { useAddresses } from "../hooks/useAddresses";
import { COLORS } from "../constants/colors";

const getParamValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
};

export default function ShippingAddressScreen() {
  const { addresses, setActiveAddress, deleteAddress, addAddress } =
    useAddresses();

  const params = useLocalSearchParams();
  const addedRef = useRef(false);

  useEffect(() => {
    const title = getParamValue(params.title);
    const country = getParamValue(params.country);
    const city = getParamValue(params.city);
    const addressLine1 = getParamValue(params.addressLine1);
    const addressLine2 = getParamValue(params.addressLine2);
    const zipCode = getParamValue(params.zipCode);

    if (!addedRef.current && title && country && city && addressLine1 && zipCode) {
      addedRef.current = true;

      addAddress({
        title,
        country,
        city,
        addressLine1,
        addressLine2,
        zipCode,
      });

      router.replace("/ShippingAddressScreen");
    }
  }, [
    params.title,
    params.country,
    params.city,
    params.addressLine1,
    params.addressLine2,
    params.zipCode,
    addAddress,
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AddressHeader
          title="Shipping Address"
          onMenuPress={() => router.push("/add-address")}
        />

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