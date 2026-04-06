import React from 'react';
import { View, Text } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

const CartHeader = () => {
  return (
    <View style={GlobalStyles.header}>
      <Text style={GlobalStyles.headerTitle}>My Cart</Text>
    </View>
  );
};

export default CartHeader;