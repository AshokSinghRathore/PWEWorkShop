import {  Text, StyleSheet } from 'react-native'
import React from 'react'


const CustomText = ({customStyle,children}) => {
  return (
    <Text
    style={[style.text,customStyle]}>
        {children}
  </Text>
  )
}

export default CustomText

const style = StyleSheet.create({
    text:{
        fontSize: 28,
        color: 
        "white",
        fontFamily: "Poppins-Bold",
        padding: 5,
        marginTop: 15,
        borderRadius: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: -1, height: 3},
        textShadowRadius: 10,
      }
})