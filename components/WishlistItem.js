import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

const WishlistItem = ({ item, onToggleSelect, onQuantityChange }) => {
  return (
    <View style={GlobalStyles.wishlistItem}>
      {/* Checkbox */}
      <TouchableOpacity 
        style={[GlobalStyles.checkbox, item.selected && GlobalStyles.checkboxSelected]}
        onPress={() => onToggleSelect(item.id)}
      >
        {item.selected && <Text style={GlobalStyles.checkboxCheck}>✓</Text>}
      </TouchableOpacity>
      
      {/* Product Image */}
      <Image source={item.image} style={GlobalStyles.wishlistImage} />
      
      {/* Product Info */}
      <View style={GlobalStyles.wishlistInfo}>
        <Text style={GlobalStyles.wishlistName}>{item.name}</Text>
        <Text style={GlobalStyles.wishlistCategory}>{item.category}</Text>
        <Text style={GlobalStyles.wishlistPrice}>$ {item.price}</Text>
        
        {/* Quantity Controls */}
        <View style={GlobalStyles.wishlistQuantityContainer}>
          <TouchableOpacity 
            style={GlobalStyles.wishlistQuantityButton}
            onPress={() => onQuantityChange(item.id, item.quantity - 1)}
          >
            <Text style={GlobalStyles.wishlistQuantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={GlobalStyles.wishlistQuantityText}>{item.quantity}</Text>
          <TouchableOpacity 
            style={GlobalStyles.wishlistQuantityButton}
            onPress={() => onQuantityChange(item.id, item.quantity + 1)}
          >
            <Text style={GlobalStyles.wishlistQuantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WishlistItem;
