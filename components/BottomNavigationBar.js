import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

const BottomNavigationBar = ({ activeTab }) => {
  return (
    <View style={GlobalStyles.bottomNav}>
      <TouchableOpacity style={GlobalStyles.navItem}>
        <Text style={GlobalStyles.navIcon}>🏠</Text>
        <Text style={GlobalStyles.navLabel}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={GlobalStyles.navItem}>
        <Text style={GlobalStyles.navIcon}>📱</Text>
        <Text style={GlobalStyles.navLabel}>Categories</Text>
      </TouchableOpacity>
      <TouchableOpacity style={GlobalStyles.navItem}>
        <Text style={[GlobalStyles.navIcon, GlobalStyles.activeNavIcon]}>🛒</Text>
        <Text style={[GlobalStyles.navLabel, GlobalStyles.activeNavLabel]}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={GlobalStyles.navItem}>
        <Text style={GlobalStyles.navIcon}>👤</Text>
        <Text style={GlobalStyles.navLabel}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigationBar;