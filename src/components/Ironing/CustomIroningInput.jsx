import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import React, {useRef} from 'react';
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import { fontFamily } from '../../screens/Authenticated/CreateOrder/DryCleanDatePicker';
import { AppColors as color } from '../../constants/color';
import CustomText from '../UI/CustomText';
const CustomIroningInputs = ({
  header,
  label1,
  label2,
  inputValue,
  onChangeText,
  dropValue1,
  openDropDown1,
  noBottom,
  label3,
  dropValue2,
  openDropDown2,
  onAdd
}) => {

  return (
    <View
      style={[
        CustomIroningInputsStyle.container,
        noBottom && {borderBottomWidth: 0},
      ]}>
      <CustomText
        customStyle={[
          CustomIroningInputsStyle.commonText,
          {color: color.tertiary},
        ]}>
        {header}
      </CustomText>
      <View style={CustomIroningInputsStyle.subContainer}>
        <CustomText customStyle={CustomIroningInputsStyle.commonText}>
          {label1}
        </CustomText>
        <View style={CustomIroningInputsStyle.quantityContainer}>
          <Pressable
            onPress={() => {
              onChangeText(
                inputValue > 1 ? (parseInt(inputValue) - 1).toString() : '',
              );
            }}
            style={CustomIroningInputsStyle.buttonContainer}>
         <Entypo
            color={"red"}
            size={19}
            name="circle-with-minus"
            />
          </Pressable>
          <TextInput
            keyboardType="numeric"
            value={inputValue}
            onChangeText={e => onChangeText(e)}
            style={{
              color: 'black',
              fontFamily: fontFamily.regular,
              fontSize: 15,
              width: 35,
            }}
          />
          <Pressable
            onPress={() => {
              onChangeText(
                inputValue ? (parseInt(inputValue) + 1).toString() : "1",
              );
            }}
            style={CustomIroningInputsStyle.buttonContainer}>
            <AntDesign
            color={"green"}
            size={15}
            name="pluscircle"
            />
          </Pressable>
        </View>
      </View>
      <Pressable
        onPress={openDropDown1}
        style={CustomIroningInputsStyle.subContainer}>
        <CustomText customStyle={CustomIroningInputsStyle.commonText}>
          {label2}
        </CustomText>

        <View
          style={[
            CustomIroningInputsStyle.quantityContainer,
            {height: 35, width: 85},
          ]}>
          <Text
            style={{
              color: 'black',
              fontFamily: fontFamily.regular,
              fontSize: 13,
              marginLeft: 5,
            }}>
            {dropValue1 ? dropValue1.value : ''}
          </Text>
        </View>
      </Pressable>
      {label3 && (
        <Pressable
          onPress={openDropDown2}
          style={CustomIroningInputsStyle.subContainer}>
          <CustomText customStyle={CustomIroningInputsStyle.commonText}>
            {label3}
          </CustomText>

          <View
            style={[
              CustomIroningInputsStyle.quantityContainer,
              {height: 35, width: 85},
            ]}>
            <Text
              style={{
                color: 'black',
                fontFamily: fontFamily.regular,
                fontSize: 13,
                marginLeft: 5,
              }}>
              {dropValue2 ? dropValue2.value : ''}
            </Text>
          </View>
        </Pressable>
      )}
      <Pressable
      onPress={onAdd}
        style={{
          backgroundColor: '#D9D9D9',
          padding: 8,
          alignItems: 'center',
          justifyContent:'center',
          position:"absolute",
          right:20,
          bottom:10
          ,borderRadius:5,
          width:100,
          paddingVertical:5
          
        }}>
        <Text
          style={{
            color: 'black',
            fontFamily: fontFamily.regular,
            fontSize: 16,
          }}>
          Add
        </Text>
      </Pressable>
    </View>
  );
};

export default CustomIroningInputs;

export const CustomIroningInputsStyle = StyleSheet.create({
  container: {
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderBlockColor: color.tertiary,
    borderTopColor: color.tertiary,
    padding: 10,
  },

  commonText: {
    marginTop: 0,
    padding: 0,
    fontSize: 18,
    color: 'black',
  },
  subContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    height: 40,
    marginLeft: 5,
    width: 80,
    paddingHorizontal:5
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    fontFamily: fontFamily.regular,
  },
});
