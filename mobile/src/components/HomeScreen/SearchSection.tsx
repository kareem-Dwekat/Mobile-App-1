import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchSection = () => {
  return (
    <View style={styles.row}>
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={22} color="#777" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.filterBtn}>
        <Ionicons name="options-outline" size={22} color="#111" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchSection;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 22,
  },
  searchBox: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#111",
  },
  filterBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});