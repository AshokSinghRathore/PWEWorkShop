import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { fontFamily } from '../../screens/Authenticated/CreateOrder/DryCleanDatePicker'
import { AppColors as color } from '../../constants/color'


const DeliveryPreference = ({onPress,condition,label,isDisable}) => {
  return (
    <TouchableOpacity
    onPress={() => {
      onPress()
    }}
    style={[
      {
        marginTop: 20,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: isDisable?"grey":color.tertiary,
        width: '90%',
      },
      condition && {
        backgroundColor: '#FF671F',
        borderColor: 'white',
      },
    ]}>
    <Text
      style={[
        {
          fontSize: 16,
          textAlign: 'center',
          color: isDisable?"grey": 'black',
          fontFamily:fontFamily.regular
        },
        !isDisable&&condition && {color: 'white'},
      ]}>
     {label}
    </Text>
  </TouchableOpacity>
  )
}

export default DeliveryPreference