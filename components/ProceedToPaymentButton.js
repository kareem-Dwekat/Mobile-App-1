import React from 'react';

import { TouchableOpacity, Text } from 'react-native';

import { GlobalStyles } from '../styles/GlobalStyles';



const ProceedToPaymentButton = ({ onPress }) => {

  return (

    <TouchableOpacity style={[GlobalStyles.proceedButton, { backgroundColor: '#007bff' }]} onPress={onPress}>

      <Text style={GlobalStyles.proceedButtonText}>Proceed To Payment</Text>

    </TouchableOpacity>

  );

};



export default ProceedToPaymentButton;