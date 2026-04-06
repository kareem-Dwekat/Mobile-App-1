// components/MenuItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuItem = ({ icon, title, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.left}>
        <Icon name={icon} size={22} color="#444" />
        <Text style={styles.text}>{title}</Text>
      </View>
      <Icon name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});