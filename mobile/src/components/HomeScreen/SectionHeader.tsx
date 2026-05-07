import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

interface Props {
  title: string;
  actionText?: string;
  onPress?: () => void;
}

const SectionHeader = ({ title, actionText, onPress }: Props) => {
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;

  return (
    <View style={styles.row}>
      <Text style={[styles.title, { fontSize: isSmallDevice ? 17 : 18 }]}>
        {title}
      </Text>

      {actionText ? (
        <TouchableOpacity onPress={onPress}>
          <Text
            style={[styles.action, { fontSize: isSmallDevice ? 14 : 16 }]}
          >
            {actionText}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontWeight: "700",
    color: "#111",
  },
  action: {
    color: "#F97316",
    fontWeight: "600",
  },
});