import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusBar = () => {
  return (
    <View style={styles.statusBar}>
      <Text style={styles.time}>12:59</Text>
      <View style={styles.icons}>
        <Text style={styles.icon}>📶</Text>
        <Text style={styles.icon}>🔋</Text>
        <Text style={styles.batteryText}>37</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 14,
    marginLeft: 5,
  },
  batteryText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 2,
  },
});

export default StatusBar;
