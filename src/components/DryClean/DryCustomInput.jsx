import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { AppColors  as color} from '../../constants/color';


const DryCustomInput = ({ label, condition, onPress, placeHolder, value,input,onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}{input&&" : "}</Text>
      {!condition && !input&&(
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.placeholder}> : {placeHolder}</Text>
        </TouchableOpacity>
      )}
      {input?<TextInput
      placeholder={placeHolder}
      onChangeText={(item)=>onChange(item)}
      value={value}
      placeholderTextColor={"grey"}
      style={styles.inputStyle}/> :condition && (
        <Text onPress={onPress} style={styles.value}> :  {value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: 'black',
    paddingVertical: 7,
    fontFamily:"Poppins-Regular",
  },
  placeholder: {
    fontSize: 15,
    color: 'black',
    fontFamily:"Poppins-Regular",
    left: 5,
    paddingVertical: 7,
  },
  value: {
    fontSize: 16,
    color: color.tertiary,
    fontFamily:"Poppins-Regular",
    left: 5,
    paddingVertical: 7,
  },
  inputStyle:{
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    width: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#90EE90',
    paddingBottom: -5,
    marginLeft:5,marginBottom:10}
  
});

export default DryCustomInput;
