import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";

type Category = {
  id: string;
  name: string;
  image: string;
};

type Props = {
  categories: Category[];
  onSelect: (category: string) => void;
};

export const CategoryImageScroll: React.FC<Props> = ({ categories, onSelect }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => onSelect(item.name)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  card: {
    width: 100,
    height: 120,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "cover",
  },
  text: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
    textAlign: "center",
  },
});
