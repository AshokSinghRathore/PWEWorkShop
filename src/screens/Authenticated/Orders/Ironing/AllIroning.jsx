import {View, Text, StatusBar, StyleSheet, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {AppColors} from '../../../../constants/color';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const AllIroning = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={{backgroundColor: AppColors.statusBarColor}} />
      <KeyboardAwareScrollView bounces={false} style={{paddingHorizontal: 10,flex:1,backgroundColor:AppColors.statusBarColor}}>
        <Text
          style={{
            fontSize: 24,
            color: 'black',
            alignSelf: 'center',
            fontFamily: 'Poppins-Bold',
            marginTop: 10,
          }}>
          All Ironing Orders
        </Text>
        <View style={IroningStyles.IroningContainer}>
        <Text style={IroningStyles.HighlighText}>
          Customer Name: <Text style={IroningStyles.ValueText}>Alex</Text>
        </Text>
            <Text style={IroningStyles.HighlighText}>
            Order Id :{' '}
            <Text style={IroningStyles.ValueText}>2fwyyHuSck121cYXU3eE</Text>
          </Text>
          <Text style={IroningStyles.HighlighText}>
            Date of Order :{' '}
            <Text style={IroningStyles.ValueText}>22-09-2023</Text>
          </Text>
          <TouchableOpacity onPress={()=>{navigation.navigate("DetailedIroningOrder")}} style={IroningStyles.viewButtonContainer}>
            <Text style={IroningStyles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
        <View style={IroningStyles.IroningContainer}>
        <Text style={IroningStyles.HighlighText}>
          Customer Name: <Text style={IroningStyles.ValueText}>Alex</Text>
        </Text>
            <Text style={IroningStyles.HighlighText}>
            Order Id :{' '}
            <Text style={IroningStyles.ValueText}>2fwyyHuSck121cYXU3eE</Text>
          </Text>
          <Text style={IroningStyles.HighlighText}>
            Date of Order :{' '}
            <Text style={IroningStyles.ValueText}>22-09-2023</Text>
          </Text>
          <TouchableOpacity onPress={()=>{navigation.navigate("DetailedIroningOrder")}} style={IroningStyles.viewButtonContainer}>
            <Text style={IroningStyles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      
      </KeyboardAwareScrollView>
    </>
  );
};

export default AllIroning;

export const IroningStyles = StyleSheet.create({
  IroningContainer: {
    padding:10,
    borderRadius:10,
    backgroundColor:"#e8f7ee",
    marginTop:10,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,

  },
  HighlighText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    padding:10
  },
  ValueText: {
    color: 'blue',
  },
  viewButtonContainer:{
    padding:10,
    borderWidth:1,
    width:150,
    alignItems:"center",
    borderRadius:10,
    flex:1,
    alignSelf:"flex-end",
    backgroundColor:"black"
  },
  viewButtonText:{
    textAlign:"right",
    color:"white",
    fontFamily:"Poppins-SemiBold"
  },
});




     /* <Text style={IroningStyles.HighlighText}>
            Cloth Type : <Text style={IroningStyles.ValueText}>0-15</Text>
          </Text>
          <Text style={IroningStyles.HighlighText}>
            Press Type : <Text style={IroningStyles.ValueText}>Normal</Text>
          </Text>
          <Text style={IroningStyles.HighlighText}>
            Quantity : <Text style={IroningStyles.ValueText}>10</Text>
          </Text> */
          /* <Text style={IroningStyles.HighlighText}>
            Delivery Preference:{' '}
            <Text style={IroningStyles.ValueText}>Instant</Text>
          </Text>
          <Text style={IroningStyles.HighlighText}>
            Pick Date:{' '}
            <Text style={IroningStyles.ValueText}>23-09-2023</Text>
          </Text>
          
          <Text style={IroningStyles.HighlighText}>
            Pick Time:{' '}
            <Text style={IroningStyles.ValueText}>10:00-10:15</Text>
          </Text>
          <Text style={IroningStyles.HighlighText}>
            Drop Date:{' '}
            <Text style={IroningStyles.ValueText}>23-09-2023</Text>
          </Text>
          
          <Text style={IroningStyles.HighlighText}>
            Drop Time:{' '}
            <Text style={IroningStyles.ValueText}>19:00-19:15</Text>
          </Text>
           */