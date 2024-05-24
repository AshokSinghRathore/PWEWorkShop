import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import { AppColors } from '../../constants/color';


const CustomButton = ({onPress, title, bgColor, textColor,containerStyle,labelStyle,showLoader}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{
        flexDirection:"row",
        backgroundColor: bgColor ? bgColor : AppColors.secondary,
        marginTop: 20,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 60,
        alignItems:"center",
        justifyContent: 'center',
        borderWidth: 1,
        width: '70%',
        borderColor: AppColors.tertiary,
        

      },containerStyle]}>
      <Text
        style={[{
          fontSize: 24,
          textAlign: 'center',
          fontFamily: 'Poppins-Regular',
          color: textColor ? textColor : 'white',
          textShadowColor: 'rgba(0, 0, 0, 0.5)',
          textShadowOffset: {width: -1, height: 2},
          textShadowRadius: 10,
          marginRight:5
        },labelStyle]}>
        {title}
      </Text>
    {showLoader&&  <ActivityIndicator size={"small"} color={"white"}/>}
    </TouchableOpacity>
  );
};

export default CustomButton;
