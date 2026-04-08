import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";

type Props = { onSubmit: (value: string) => void };

export const SearchBar: React.FC<Props> = ({ onSubmit }) => {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        placeholderTextColor="#888"
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={() => onSubmit(search)}
      />

      <TouchableOpacity
        style={styles.searchButton}
        activeOpacity={0.7}
        onPress={() => onSubmit(search)}
      >
        <Text style={styles.searchButtonText}>search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      borderWidth: 1,

    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#8C8C8C",
    paddingVertical: 6,
    borderWidth: 0,
    outlineStyle: "none",
  },
  searchButton: {
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 8,
  },
  searchButtonText: {
    color: "#F7F7F7",
    fontWeight: "600",
    fontSize: 14,
  },
});
