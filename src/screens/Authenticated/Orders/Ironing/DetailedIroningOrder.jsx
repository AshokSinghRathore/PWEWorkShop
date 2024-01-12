import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IroningStyles } from './AllIroning';
import { AppColors } from '../../../../constants/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleForInputs } from '../../../Auth/UserDetails';

const DetailedIroningOrder = () => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.heading}>Order Details</Text>
      </SafeAreaView>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.detailText}>
          Customer Name: <Text style={styles.valueText}>Alex</Text>
        </Text>
        <Text style={styles.detailText}>
          Cloth Type: <Text style={styles.valueText}>0-15</Text>
        </Text>
        <Text style={styles.detailText}>
          Press Type: <Text style={styles.valueText}>Normal</Text>
        </Text>
        <Text style={styles.detailText}>
          Quantity: <Text style={styles.valueText}>10</Text>
        </Text>
        <Text style={styles.detailText}>
          Delivery Preference: <Text style={styles.valueText}>Instant</Text>
        </Text>
        <Text style={styles.detailText}>
          Pick Date: <Text style={styles.valueText}>23-09-2023</Text>
        </Text>
        <Text style={styles.detailText}>
          Pick Time: <Text style={styles.valueText}>10:00-10:15</Text>
        </Text>
        <Text style={styles.detailText}>
          Drop Date: <Text style={styles.valueText}>23-09-2023</Text>
        </Text>
        <Text style={styles.detailText}>
          Drop Time: <Text style={styles.valueText}>19:00-19:15</Text>
        </Text>
        <Text style={styles.detailText}>
          Address:{' '}
          <Text style={styles.valueText}>
            88/33, SouthCity Sector 3, Gurgaon
          </Text>
        </Text>
        <View style={{width:"100%",height:1,backgroundColor:"grey",marginBottom:10}} />
        <TouchableOpacity style={StyleForInputs.SumbitButtonStyle}>
          <Text style={StyleForInputs.SumbitButtonTextStyle}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={StyleForInputs.SumbitButtonStyle}>
          <Text style={StyleForInputs.SumbitButtonTextStyle}>Update Order Status</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: AppColors.statusBarColor,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',

  },
  detailText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    paddingVertical: 5,
  },
  valueText: {
    color: 'blue',
  },
});

export default DetailedIroningOrder;
