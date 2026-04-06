import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

const CartItem = ({ item, onQuantityChange, onDelete }) => {
  return (
    <View style={GlobalStyles.cartItem}>
      <Image source={item.image} style={[GlobalStyles.productImage, { backgroundColor: '#f5f5f5' }]} />
      <View style={GlobalStyles.productInfo}>
        <Text style={GlobalStyles.productName}>{item.name}</Text>
        <Text style={GlobalStyles.productPrice}>${item.price.toFixed(2)}</Text>
        <View style={GlobalStyles.quantityContainer}>
          <TouchableOpacity onPress={() => onQuantityChange(item.id, item.quantity - 1)}>
            <Text style={GlobalStyles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={GlobalStyles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => onQuantityChange(item.id, item.quantity + 1)}>
            <Text style={GlobalStyles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={GlobalStyles.deleteButton}>
        <Text>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;