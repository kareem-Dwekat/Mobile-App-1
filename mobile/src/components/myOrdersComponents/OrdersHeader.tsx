import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
 const handleOnPress = () => {
    try{
        router.back()
    }catch(error){
      console.log(error);
    }
  };
const OrdersHeader = ({ }: any) => {
  return (
    <View style={styles.header}>
      <Pressable onPress={handleOnPress}>
        <Ionicons name="arrow-back" size={24} color="#1f2937" />
      </Pressable>

      <Text  style={styles.title}>My Orders</Text>
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