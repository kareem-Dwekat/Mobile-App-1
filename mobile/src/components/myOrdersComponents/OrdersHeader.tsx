import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OrdersHeader = ({ onBack }: any) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#1f2937" />
      </TouchableOpacity>

      <Text style={styles.title}>My Orders</Text>
    </View>
  );
};

export default OrdersHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 25,
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
  },
});