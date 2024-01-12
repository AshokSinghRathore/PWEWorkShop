import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';


const DashboardButton = ({onPress,text,image}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image

        source={image}
        style={styles.icon}
        resizeMode="contain"
      />
      <View style={styles.hr} />
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 170,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    // Shadow properties
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 10, // For Android shadow,
    
  },
  icon: {
    width: 80,
    height: 80,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default DashboardButton;
