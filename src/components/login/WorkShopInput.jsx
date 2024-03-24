import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {ServicePinCodeStyle} from '../../screens/Auth/UserDetails';
import AntDesign from 'react-native-vector-icons/AntDesign';
const WorkShopInput = ({onPress}) => {
  return (
    <View style={ServicePinCodeStyle.container}>
      <View style={ServicePinCodeStyle.navbar}>
        <Text style={ServicePinCodeStyle.textStyle}>
          Your Work Shop Pin Code
        </Text>
        <Pressable
          style={{
            flexDirection: 'row',
            width: 100,
            justifyContent: 'flex-end',
          }}
          onPress={onPress}>
          <AntDesign size={24} color="black" name="arrowright" />
        </Pressable>
      </View>
    </View>
  );
};

export default WorkShopInput;
