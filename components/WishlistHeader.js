import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

const WishlistHeader = ({ onGoBack }) => {
  return (
    <View style={GlobalStyles.wishlistHeader}>
      <TouchableOpacity style={GlobalStyles.backButton} onPress={onGoBack}>
        <Text style={GlobalStyles.backArrow}>←</Text>
      </TouchableOpacity>
      <Text style={GlobalStyles.wishlistHeaderTitle}>My Wishlist</Text>
      <View style={GlobalStyles.headerPlaceholder} />
    </View>
  );
};

export default WishlistHeader;
