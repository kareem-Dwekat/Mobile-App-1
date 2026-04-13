import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const COUNTRIES = ["Australia", "Palestine", "Jordan"];
const STATES = ["Victoria", "NSW", "Queensland"];
const CITIES = ["Melbourne", "Geelong", "Sydney"];

export default function AddAddressScreen() {
  const [title, setTitle] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [showCountries, setShowCountries] = useState(false);
  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);

  const handleSubmit = () => {
    if (!title || !addressLine1 || !zipCode || !country || !state || !city) {
      Alert.alert("Missing Fields", "Please fill all fields.");
      return;
    }

    router.push({
      pathname: "/ShippingAddressScreen",
      params: {
        title,
        country,
        city,
        addressLine1,
        addressLine2: state,
        zipCode,
      },
    });
  };

  const renderDropdown = (
    label: string,
    value: string,
    placeholder: string,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    options: string[],
    onSelect: React.Dispatch<React.SetStateAction<string>>
  ) => (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={styles.selectBox}
        activeOpacity={0.8}
        onPress={() => setOpen(!open)}
      >
        <Text style={[styles.selectText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#444" />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          {options.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                onSelect(item);
                setOpen(false);
              }}
            >
              <Text style={styles.dropdownText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={26} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Address</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#A3A3A3"
          value={title}
          onChangeText={setTitle}
        />

        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder="Address"
            placeholderTextColor="#A3A3A3"
            value={addressLine1}
            onChangeText={setAddressLine1}
            multiline
          />
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Location Details</Text>

        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Zip Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Zip Code"
            placeholderTextColor="#A3A3A3"
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
          />
        </View>

        {renderDropdown(
          "Country",
          country,
          "Select Country",
          showCountries,
          setShowCountries,
          COUNTRIES,
          setCountry
        )}

        {renderDropdown(
          "State",
          state,
          "Select State",
          showStates,
          setShowStates,
          STATES,
          setState
        )}

        {renderDropdown(
          "City",
          city,
          "Select City",
          showCities,
          setShowCities,
          CITIES,
          setCity
        )}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const BORDER = "#E5E5E5";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 28,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },
  backBtn: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111111",
  },
  fieldWrapper: {
    marginBottom: 22,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 10,
  },
  input: {
    minHeight: 58,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    color: "#111111",
    backgroundColor: "#FFFFFF",
  },
  addressInput: {
    minHeight: 106,
    textAlignVertical: "top",
    paddingTop: 18,
  },
  divider: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginBottom: 26,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 24,
  },
  selectBox: {
    minHeight: 58,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectText: {
    fontSize: 16,
    color: "#111111",
  },
  placeholderText: {
    color: "#A3A3A3",
  },
  dropdown: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  dropdownItem: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  dropdownText: {
    fontSize: 15,
    color: "#111111",
  },
  submitBtn: {
    marginTop: 12,
    height: 58,
    borderRadius: 14,
    backgroundColor: "#FF6A00",
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});