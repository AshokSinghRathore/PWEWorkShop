import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from '../UI/CustomText';
import { AppColors  as color} from '../../constants/color';


const CustomWalletLabel = ({label, labelColor}) => {
  return (
    <View style={CustomWalletLabelStyles.container}>
      <CustomText
        customStyle={{
          marginTop: 0,
          padding: 0,
          color: labelColor,
          fontSize:19
        }}>
        {label}
      </CustomText>
    </View>
  );
};

export default CustomWalletLabel;

const CustomWalletLabelStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: color.quaternary,
    paddingBottom: 10,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
});
