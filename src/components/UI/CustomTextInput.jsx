import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {AppColors} from '../../constants/color';

const CustomTextInput = ({
  value,
  onChangeText,
  placeHolder,
  placeHolderColor,
  Style,
  secure
}) => {
  return (
    <>
    
      <TextInput
        style={[CustomTextInputStyle.inputStyle,Style]}
        placeholder={placeHolder}
        placeholderTextColor={placeHolderColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
      />
    </>
  );
};

export default CustomTextInput;

const CustomTextInputStyle = StyleSheet.create({
  inputStyle: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: AppColors.inputPrimary,
    marginTop:25,
    marginBottom:10,
    borderRadius:8,
    padding:10,
    fontFamily:"Poppins-Medium",
  },
});
