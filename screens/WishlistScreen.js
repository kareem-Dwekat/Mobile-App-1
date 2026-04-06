import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import StatusBar from '../components/StatusBar';
import WishlistHeader from '../components/WishlistHeader';
import WishlistItem from '../components/WishlistItem';
import WishlistFooter from '../components/WishlistFooter';
import { GlobalStyles } from '../styles/GlobalStyles';

const WishlistScreen = () => {
  const [wishlistItems, setWishlistItems] = useState([
    { 
      id: '1', 
      name: 'Classic Cotton Oxford Shirt', 
      category: "Kids' Fashion",
      price: 200, 
      quantity: 1,
      selected: true,
      image: require('../assets/images/tf.webp')
    },
    { 
      id: '2', 
      name: 'Slim Fit Denim Shirt', 
      category: "Kids' Fashion",
      price: 299, 
      quantity: 1,
      selected: true,
      image: require('../assets/images/oip.webp')
    },
    { 


      id: '3', 
      name: 'Linen Casual Button-Down', 
      category: "Kids' Fashion",
      price: 357, 
      quantity: 1,
      selected: true,
       image: require('../assets/images/yd.webp')
    },
    { 
      id: '4', 
      name: 'Casual Jogger', 
      category: 'Sportswear',
      price: 200, 
      quantity: 1,
      selected: true,
     image: require('../assets/images/pocket.webp')
    }
  ]);

  const [selectAll, setSelectAll] = useState(true);

  const handleToggleSelect = (id) => {
    setWishlistItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleToggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setWishlistItems(prevItems =>
      prevItems.map(item => ({ ...item, selected: newSelectAll }))
    );
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setWishlistItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDelete = () => {
    const selectedItems = wishlistItems.filter(item => item.selected);
    if (selectedItems.length === 0) {
      Alert.alert('No Selection', 'Please select items to delete');
      return;
    }
    Alert.alert('Delete Items', `Delete ${selectedItems.length} selected items?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {
        setWishlistItems(prevItems => prevItems.filter(item => !item.selected));
        setSelectAll(false);
      }}
    ]);
  };

  const handleAddToCart = () => {
    const selectedItems = wishlistItems.filter(item => item.selected);
    if (selectedItems.length === 0) {
      Alert.alert('No Selection', 'Please select items to add to cart');
      return;
    }
    Alert.alert('Success', `${selectedItems.length} items added to cart!`);
  };

  const handleGoBack = () => {
    // Navigate back - will be handled by navigation
    console.log('Going back...');
  };

  return (
    <View style={GlobalStyles.container}>
      <StatusBar />
      <WishlistHeader onGoBack={handleGoBack} />
      <ScrollView style={{ flex: 1 }}>
        {wishlistItems.map(item => (
          <WishlistItem 
            key={item.id} 
            item={item} 
            onToggleSelect={handleToggleSelect}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </ScrollView>
      <WishlistFooter 
        selectAll={selectAll}
        onToggleSelectAll={handleToggleSelectAll}
        onAddToCart={handleAddToCart}
        onDelete={handleDelete}
      />
    </View>
  );
};

export default WishlistScreen;
