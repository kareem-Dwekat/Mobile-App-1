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
  }, [search]);

  useEffect(() => {
    onChangeSearch(searchValue || "");
  }, [searchValue]);

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.searchBox,
          { height: isSmallDevice ? 48 : 52 },
        ]}
      >
        <Ionicons name="search-outline" size={22} color="#777" />

        <Controller
          control={control}
          name="search"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Search"
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
        onPress={onFilterPress}
        style={[
          styles.filterBtn,
          {
            width: isSmallDevice ? 48 : 52,
            height: isSmallDevice ? 48 : 52,
          },
        ]}
      >
        <Ionicons name="options-outline" size={22} color="#111" />
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
    borderRadius: 14,
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
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});