import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileImage = () => {
  return (
    <View style={styles.imageWrapper}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
        style={styles.image}
      />

      <TouchableOpacity style={styles.editBtn}>
        <Icon name="pencil" size={14} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 120,
    backgroundColor: '#ff6b00',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});