import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomButton = ({label, onPress, showLoader,buttonStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{
        marginTop: 40,
        backgroundColor: '#5245c4',
        width: 200,
        height: 50,
        borderRadius: 15,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },buttonStyle]}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          color: 'white',
          fontFamily: 'Poppins-SemiBold',
        }}>
        {label}
      </Text>
      {showLoader && <ActivityIndicator size={24} color={'white'} />}
    </TouchableOpacity>
  );
};

export default CustomButton;
