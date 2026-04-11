import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { OrdersTabsProps } from "../../types/order";

const OrdersTabs = ({ tabs, activeTab, setActiveTab }: OrdersTabsProps) => {
  return (
    <View style={styles.tabs}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => setActiveTab(tab.key)}
        >
          <View style={styles.tabInner}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>

            <View
              style={[
                styles.countBadge,
                activeTab === tab.key && styles.countBadgeActive,
              ]}
            >
              <Text
                style={[
                  styles.countText,
                  activeTab === tab.key && styles.countTextActive,
                ]}
              >
                {tab.count}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OrdersTabs;

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  tab: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#f0f2f5",
    paddingVertical: 8,
    marginHorizontal: 2,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#ff6b00",
  },
  tabInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  tabText: {
    fontSize: 11,
    color: "#5b6472",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
  },
  countBadge: {
    backgroundColor: "#d7dce3",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  countBadgeActive: {
    backgroundColor: "#fff",
  },
  countText: {
    fontSize: 10,
    fontWeight: "700",
  },
  countTextActive: {
    color: "#ff6b00",
  },
});