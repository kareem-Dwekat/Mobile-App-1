import React, { useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";

interface Props {
  search: string;
  onChangeSearch: (text: string) => void;
  onFilterPress: () => void;
}

type FormData = {
  search: string;
};

const SearchSection = ({ search, onChangeSearch, onFilterPress }: Props) => {
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;

  const { control, setValue, watch } = useForm<FormData>({
    defaultValues: {
      search: search,
    },
  });

  const searchValue = watch("search");

  useEffect(() => {
    setValue("search", search);
  }, [search, setValue]);

  useEffect(() => {
    onChangeSearch(searchValue || "");
  }, [searchValue, onChangeSearch]);

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.searchBox,
          { height: isSmallDevice ? 48 : 54 },
        ]}
      >
        <Ionicons name="search-outline" size={22} color="#777" />

        <Controller
          control={control}
          name="search"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Search products..."
              placeholderTextColor="#999"
              value={value}
              onChangeText={onChange}
              style={[
                styles.input,
                { fontSize: isSmallDevice ? 14 : 16 },
              ]}
            />
          )}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onFilterPress}
        style={[
          styles.filterBtn,
          {
            width: isSmallDevice ? 48 : 54,
            height: isSmallDevice ? 48 : 54,
          },
        ]}
      >
        <Ionicons name="options-outline" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchSection;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 22,
    alignItems: "center",
  },
  searchBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    marginRight: 12,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#111",
  },
  filterBtn: {
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6B00",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
});