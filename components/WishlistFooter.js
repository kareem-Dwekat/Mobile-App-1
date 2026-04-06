import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

const WishlistFooter = ({ selectAll, onToggleSelectAll, onAddToCart, onDelete }) => {
  return (
    <View style={GlobalStyles.wishlistFooter}>
      {/* Select All Row */}
      <View style={GlobalStyles.selectAllRow}>
        <TouchableOpacity 
          style={[GlobalStyles.checkbox, selectAll && GlobalStyles.checkboxSelected]}
          onPress={onToggleSelectAll}
        >
          {selectAll && <Text style={GlobalStyles.checkboxCheck}>✓</Text>}
        </TouchableOpacity>
        <Text style={GlobalStyles.selectAllText}>Select all</Text>
      </View>
      
      {/* Action Buttons */}
      <View style={GlobalStyles.actionButtonsRow}>
        <TouchableOpacity 
          style={GlobalStyles.addToCartButton}
          onPress={onAddToCart}
        >
          <Text style={GlobalStyles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={GlobalStyles.deleteButton}
          onPress={onDelete}
        >
          <Text style={GlobalStyles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WishlistFooter;
