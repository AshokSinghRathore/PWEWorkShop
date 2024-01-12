import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../../../constants/color';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AllDryClean = ({ navigation }) => {
  return (
    <>
      <SafeAreaView style={styles.safeArea} />
      <KeyboardAwareScrollView bounces={false} style={styles.container}>
        <Text style={styles.heading}>All DryClean Orders</Text>
        <View style={styles.orderContainer}>
          <Text style={styles.detailText}>
            Customer Name: <Text style={styles.valueText}>Alex</Text>
          </Text>
          <Text style={styles.detailText}>
            Order Id: <Text style={styles.valueText}>2fwyyHuSck121cYXU3eE</Text>
          </Text>
          <Text style={styles.detailText}>
            Date of Order: <Text style={styles.valueText}>22-09-2023</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailedDryCleanOrder');
            }}
            style={styles.viewButton}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orderContainer}>
          <Text style={styles.detailText}>
            Customer Name: <Text style={styles.valueText}>Alex</Text>
          </Text>
          <Text style={styles.detailText}>
            Order Id: <Text style={styles.valueText}>2fwyyHuSck121cYXU3eE</Text>
          </Text>
          <Text style={styles.detailText}>
            Date of Order: <Text style={styles.valueText}>22-09-2023</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailedIroningOrder');
            }}
            style={styles.viewButton}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orderContainer}>
          <Text style={styles.detailText}>
            Customer Name: <Text style={styles.valueText}>Alex</Text>
          </Text>
          <Text style={styles.detailText}>
            Order Id: <Text style={styles.valueText}>2fwyyHuSck121cYXU3eE</Text>
          </Text>
          <Text style={styles.detailText}>
            Date of Order: <Text style={styles.valueText}>22-09-2023</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailedIroningOrder');
            }}
            style={styles.viewButton}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orderContainer}>
          <Text style={styles.detailText}>
            Customer Name: <Text style={styles.valueText}>Alex</Text>
          </Text>
          <Text style={styles.detailText}>
            Order Id: <Text style={styles.valueText}>2fwyyHuSck121cYXU3eE</Text>
          </Text>
          <Text style={styles.detailText}>
            Date of Order: <Text style={styles.valueText}>22-09-2023</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailedIroningOrder');
            }}
            style={styles.viewButton}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orderContainer}>
          <Text style={styles.detailText}>
            Customer Name: <Text style={styles.valueText}>Alex</Text>
          </Text>
          <Text style={styles.detailText}>
            Order Id: <Text style={styles.valueText}>2fwyyHuSck121cYXU3eE</Text>
          </Text>
          <Text style={styles.detailText}>
            Date of Order: <Text style={styles.valueText}>22-09-2023</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailedIroningOrder');
            }}
            style={styles.viewButton}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orderContainer}>
          <Text style={styles.detailText}>
            Customer Name: <Text style={styles.valueText}>Alex</Text>
          </Text>
          <Text style={styles.detailText}>
            Order Id: <Text style={styles.valueText}>2fwyyHuSck121cYXU3eE</Text>
          </Text>
          <Text style={styles.detailText}>
            Date of Order: <Text style={styles.valueText}>22-09-2023</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailedIroningOrder');
            }}
            style={styles.viewButton}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orderContainer}>
          <Text style={styles.detailText}>
            Customer Name: <Text style={styles.valueText}>Alex</Text>
          </Text>
          <Text style={styles.detailText}>
            Order Id: <Text style={styles.valueText}>2fwyyHuSck121cYXU3eE</Text>
          </Text>
          <Text style={styles.detailText}>
            Date of Order: <Text style={styles.valueText}>22-09-2023</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailedIroningOrder');
            }}
            style={styles.viewButton}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orderContainer}>
          <Text style={styles.detailText}>
            Customer Name: <Text style={styles.valueText}>Alex</Text>
          </Text>
          <Text style={styles.detailText}>
            Order Id: <Text style={styles.valueText}>2fwyyHuSck121cYXU3eE</Text>
          </Text>
          <Text style={styles.detailText}>
            Date of Order: <Text style={styles.valueText}>22-09-2023</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailedIroningOrder');
            }}
            style={styles.viewButton}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>


     
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: AppColors.statusBarColor,

  },
  container: {

    flex:1,
    backgroundColor:AppColors.statusBarColor,
    paddingHorizontal:10
  },
  heading: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  orderContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#e8f7ee',
    marginTop: 10,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
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
  viewButton: {
    padding: 10,
    borderWidth: 1,
    width: 150,
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'black',
  },
  viewButtonText: {
    textAlign: 'right',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  
});

export default AllDryClean;
