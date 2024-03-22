import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
const AppColors = {
  inputPrimary: '#e8f7ee',
};

const CustomDropdown = ({
  Icon,
  data,
  value,
  onPress,
  placeholder,
  labelField,
  valueField,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <View style={{width: '80%',  marginTop: 10}}>
      <Dropdown
        style={[
          Styles.dropdown,
          focus && {borderColor: AppColors.inputPrimary},
        ]}
        placeholderStyle={Styles.placeholderStyle}
        selectedTextStyle={Styles.selectedTextStyle}
        inputSearchStyle={Styles.inputSearchStyle}
        itemContainerStyle={{borderWidth: 0.7}}
        iconStyle={Styles.iconStyle}
        itemTextStyle={{color: 'black'}}
        iconColor="black"
        keyboardAvoiding
        data={data}
        search
        maxHeight={300}
        labelField={labelField ? labelField : 'label'}
        valueField={valueField ? valueField : 'value'}
        placeholder={!focus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={item => onPress(item)}
        renderLeftIcon={Icon}
      />
    </View>
  );
};

export default CustomDropdown;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.inputPrimary,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: AppColors.inputPrimary,
    width:"100%"
  },
  label: {
    position: 'absolute',
    backgroundColor: AppColors.inputPrimary,
    left: 22,
    top: 8,
    // zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  placeholderStyle: {
    fontSize: 16,
    backgroundColor: AppColors.inputPrimary,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    backgroundColor: AppColors.inputPrimary,
    color: 'black',
    marginLeft: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  iconStyle: {
    width: 20,
    height: 20,
    backgroundColor: AppColors.inputPrimary,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
});
