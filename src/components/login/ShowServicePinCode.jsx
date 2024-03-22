import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';
import React from 'react';

const ShowServicePinCode = ({data}) => {
  return (
    <ScrollView
      nestedScrollEnabled
      contentContainerStyle={[ShowServicePinCodeStyle.FlatListStyle]}>
      {data.length > 0 ? (
        data.map((item, index) => {
          return (
            <View style={ShowServicePinCodeStyle.container} key={item.pathRef}>
              <Text style={ShowServicePinCodeStyle.text}>{item.State}</Text>
              <Text style={ShowServicePinCodeStyle.text}>{item.City}</Text>
              <Text style={ShowServicePinCodeStyle.text}>{item.Pincode}</Text>
            </View>
          );
        })
      ) : (
        <Text
          style={[
            ShowServicePinCodeStyle.text,
            {fontFamily: 'Poppins-SemiBold'},
          ]}>
          No Pin Code
        </Text>
      )}
    </ScrollView>
  );
};

export default ShowServicePinCode;

const ShowServicePinCodeStyle = StyleSheet.create({
  FlatListStyle: {
    marginVertical: 10,
    width: '100%',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    width: '90%',
  },
  text: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
});
