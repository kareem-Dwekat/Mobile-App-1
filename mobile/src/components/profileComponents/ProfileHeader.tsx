// components/ProfileHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileHeader = ({ navigation }: any) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={22} color="#444" />
      </TouchableOpacity>

      <Text style={styles.title}>Profile</Text>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 6,
  },
  backBtn: {
    padding: 6,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
  },
});