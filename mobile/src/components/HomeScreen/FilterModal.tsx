import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  selectedCategory: string;
  maxPrice: number;
  categories: string[];
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  onChangePrice: (value: number) => void;
  onClear: () => void;
  onApply: () => void;
}

export default function FilterModal({
  visible,
  selectedCategory,
  maxPrice,
  categories,
  onClose,
  onSelectCategory,
  onChangePrice,
  onClear,
  onApply,
}: Props) {
  const { height } = useWindowDimensions();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[styles.sheet, { maxHeight: height * 0.78 }]}
          onPress={() => {}}
        >
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filter</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#111" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            <Text style={styles.sectionTitle}>Categories</Text>

            <View style={styles.tagsWrap}>
              {categories.map((category) => {
                const active = selectedCategory === category;

                return (
                  <TouchableOpacity
                    key={category}
                    style={[styles.tag, active && styles.activeTag]}
                    onPress={() => onSelectCategory(category)}
                  >
                    <Text style={[styles.tagText, active && styles.activeTagText]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>Price Range</Text>

            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={5000}
              step={1}
              value={maxPrice}
              onValueChange={onChangePrice}
              minimumTrackTintColor="#FF6A00"
              maximumTrackTintColor="#E5E5E5"
              thumbTintColor="#FF6A00"
            />

            <View style={styles.priceRow}>
              <Text style={styles.priceText}>$0</Text>
              <Text style={styles.priceText}>${maxPrice}</Text>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.clearBtn} onPress={onClear}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.applyBtn} onPress={onApply}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
  },
  handle: {
    width: 70,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#DDD",
    alignSelf: "center",
    marginBottom: 16,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  divider: {
    height: 1,
    backgroundColor: "#EFEFEF",
    marginHorizontal: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 16,
  },
  tagsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 30,
  },
  tag: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  activeTag: {
    backgroundColor: "#FF6A00",
    borderColor: "#FF6A00",
  },
  tagText: {
    color: "#222",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTagText: {
    color: "#fff",
    fontWeight: "700",
  },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: 16,
    color: "#7A7A7A",
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: "#fff",
  },
  clearBtn: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  clearText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  applyBtn: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6A00",
  },
  applyText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
});