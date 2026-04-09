import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import ProfileHeader from '../components/profileComponents/ProfileHeader';
import ProfileImage from '../components/profileComponents/ProfileImage';
import MenuItem from '../components/profileComponents/MenuItem';
import { router } from 'expo-router';
const onSubmit = () => {
   try {
     router.push('/myOrders'); 
    
}  catch (error) {
     console.log(error);  
}
}
const ProfileScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      
      <ProfileHeader navigation={navigation} />

      <ProfileImage />

      <View style={styles.menu}>
        <MenuItem onPress={onSubmit} title="My Orders" icon="receipt-outline" />

        <MenuItem title="Payment History" icon="card-outline"/>

        <MenuItem title="Wish List" icon="heart-outline"/>

        <MenuItem title="Shipping Address" icon="location-outline"/>

        <MenuItem title="Your Profile" icon="person-outline"/>

        <MenuItem title="Logout" icon="log-out-outline" />
      </View>

    </SafeAreaView>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menu: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fafafa',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e4dfdf',
  },
});