import React from 'react';
import { View, Text } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

const CartSummary = ({ subtotal, shipping, total }) => {
  return (
    <View style={GlobalStyles.summaryContainer}>
      <View style={GlobalStyles.summaryRow}>
        <Text style={GlobalStyles.summaryLabel}>Subtotal</Text>
        <Text style={GlobalStyles.summaryValue}>${subtotal.toFixed(2)}</Text>
      </View>
      <View style={GlobalStyles.summaryRow}>
        <Text style={GlobalStyles.summaryLabel}>Shipping</Text>
        <Text style={GlobalStyles.summaryValue}>${shipping.toFixed(2)}</Text>
      </View>
      <View style={GlobalStyles.totalRow}>
        <Text style={GlobalStyles.totalLabel}>Total</Text>
        <Text style={GlobalStyles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default CartSummary;