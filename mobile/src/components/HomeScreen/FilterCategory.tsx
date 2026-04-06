import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";

type Props = {
  categories: string[];
  onSelect: (category: string) => void;
};

export const FilterCategory: React.FC<Props> = ({ categories, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    onSelect(category);
    setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.filterButton} onPress={() => setVisible(true)}>
        <Text style={styles.filterText}>Filter</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.modal}>

            <View style={styles.header}>
              <Text style={styles.title}>Select Category</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.closeIcon}>❌</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={categories}
              numColumns={4}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.categoryCard,
                    selectedCategory === item && styles.selectedCard,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === item && styles.selectedText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    backgroundColor: "#4CAF60",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginLeft: 8,
  },
  filterText: { color: "#fff", fontWeight: "600" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  closeIcon: { fontSize: 18 },
  categoryCard: {
    flex: 1,
    margin: 6,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: { fontSize: 14, color: "#333" },
  selectedCard: { backgroundColor: "#E8F5E9", borderWidth: 1, borderColor: "#4CAF50" },
  selectedText: { color: "#4CAF50", fontWeight: "700" },
});
