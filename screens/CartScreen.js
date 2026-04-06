import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import StatusBar from '../components/StatusBar';
import CartHeader from '../components/CartHeader';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import ProceedToPaymentButton from '../components/ProceedToPaymentButton';
import BottomNavigationBar from '../components/BottomNavigationBar';
import { GlobalStyles } from '../styles/GlobalStyles';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    { 
      id: '1', 
      name: 'Classic Red T-Shirt', 
      price: 36.99, 
      quantity: 2, 
      image: require('../assets/images/t-shirt.webp')
    },
    { 
      id: '2', 
      name: 'Blue Denim Jeans', 
      price: 79.99, 
      quantity: 1, 
      image: require('../assets/images/BlueJeans.png')
   
      
    },
    { 
      id: '3', 
      name: 'Running Shoes', 
      price: 129.99, 
      quantity: 1, 
      image: require('../assets/images/t.png')
    }
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity === 0) {
      Alert.alert('Remove Item', 'Do you want to remove this item from cart?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => handleDelete(id) }
      ]);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10.00;
  const total = subtotal + shipping;

  const handleProceedToPayment = () => {
    Alert.alert('Payment', `Total Amount: $${total.toFixed(2)}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Proceed', onPress: () => console.log('Proceeding to payment...') }
    ]);
  };

  return (
    <View style={GlobalStyles.container}>
      <StatusBar />
      <CartHeader />
      <ScrollView style={{ flex: 1 }}>
        {cartItems.map(item => (
          <CartItem 
            key={item.id} 
            item={item} 
            onQuantityChange={handleQuantityChange}
            onDelete={handleDelete}
          />
        ))}
        <CartSummary subtotal={subtotal} shipping={shipping} total={total} />
        <ProceedToPaymentButton onPress={handleProceedToPayment} />
      </ScrollView>
      <BottomNavigationBar activeTab="Cart" />
    </View>
  );
};

export default CartScreen;