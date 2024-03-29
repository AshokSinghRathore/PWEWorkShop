import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AppColors } from '../../../../constants/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleForInputs } from '../../../Auth/UserDetails';
import { formatDate } from '../../../../helpers/DateFunction';
import EditDryCleanOrder from '../../../../components/DryClean/EditDryCleanOrder';
import { useSelector } from 'react-redux';
import { orderStatus } from '../../../../constants/constant';

const DetailedDryCleanOrder = ({ route, navigation }) => {
  const Data = useSelector(state =>
    state.DryCleanOrder.data.find(item => item.id === route.params),
  );
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.heading}>Order Details</Text>
      </SafeAreaView>

      <FlatList
        renderItem={() => {
          return (
            <>
              <Text style={styles.detailText}>
                Customer Name:{' '}
                <Text style={styles.valueText}>{Data?.data().user_name}</Text>
              </Text>
              <Text style={styles.detailText}>
                Customer Name:{' '}
                <Text style={styles.valueText}>{Data?.data().user_contact}</Text>
              </Text>
              <Text style={styles.detailText}>
                Quantity:{' '}
                <Text style={styles.valueText}>{Data?.data().DryClean?.length}</Text>
              </Text>
              <Text style={styles.detailText}>
                Pick Date:{' '}
                <Text style={styles.valueText}>
                  {Data && Data.data().PickDate
                    ? formatDate(new Date(Data.data().PickDate))
                    : ''}
                </Text>
              </Text>
              <Text style={styles.detailText}>
                Pick Time:{' '}
                <Text style={styles.valueText}>{Data?.data().Picktime}</Text>
              </Text>
              <Text style={styles.detailText}>
                Drop Date:{' '}
                <Text style={styles.valueText}>
                  {Data && Data.data().DropDate
                    ? formatDate(new Date(Data.data().DropDate))
                    : 'Not Assign'}
                </Text>
              </Text>
              <Text style={styles.detailText}>
                Drop Time:{' '}
                <Text style={styles.valueText}>
                  {Data?.data().Droptime || 'Not Assign'}
                </Text>
              </Text>
              <Text style={styles.detailText}>
                Address:{' '}
                <Text style={styles.valueText}>
                  {Data?.data().Address?.House +
                    ', ' +
                    Data?.data().Address?.Area +
                    ', ' +
                    Data?.data().Address?.City +
                    ', ' +
                    Data?.data().Address?.State +
                    ', ' +
                    Data?.data().Address?.Pincode}
                </Text>
              </Text>
              <Text style={[styles.detailText]}>
                Delivery Price:{' '}

                <Text style={styles.valueText}> ₹ {Data?.data().deliveryCharge}</Text>
              </Text>
              <Text style={[styles.detailText]}>
                Price:{' '}

                <Text style={styles.valueText}> ₹ {Data?.data().price} {(Data?.data().usePoints || Data?.data().useWallets) ? `(${Data?.data().usePoints ? 'Points ' : ""} ${(Data?.data().usePoints && Data?.data().useWallets) ? "/" : ""} ${Data?.data().useWallets ? 'Wallet' : ""} Used )` : ""}</Text>
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: 'grey',
                  marginBottom: 10,
                }}
              />
              {Data?.data().status !== orderStatus[3] && <TouchableOpacity
                onPress={() => {
                  let cpData = { ...Data.data(), id: Data.id };
                  delete cpData.DateOfOrder;
                  navigation.navigate('EditDryCleanOrder', cpData);
                }}
                style={StyleForInputs.SumbitButtonStyle}>
                <Text style={StyleForInputs.SumbitButtonTextStyle}>Edit</Text>
              </TouchableOpacity>}
              {Data?.data().status !== orderStatus[3] && <TouchableOpacity
                onPress={() => {
                  Alert.alert('Next Drop', 'Hell Yeeaaah');
                }}
                style={StyleForInputs.SumbitButtonStyle}>
                <Text style={StyleForInputs.SumbitButtonTextStyle}>
                  Update Order Status
                </Text>
              </TouchableOpacity>}
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Next Drop', 'Hell Yeeaaah');
                }}
                style={StyleForInputs.SumbitButtonStyle}>
                <Text style={StyleForInputs.SumbitButtonTextStyle}>
                  Print Bill
                </Text>
              </TouchableOpacity>
              <View style={{ marginTop: 20 }}>
                <Text style={StyleForInputs.HeaderText}>Order Details</Text>
                <View style={{ width: "100%", borderTopWidth: 0.8, borderTopColor: "black" }}>
                  <FlatList
                    keyExtractor={item => item.Date}
                    data={Data?.data().DryClean}
                    renderItem={({ item }) => {
                      const cloth =
                        item.DryCleanClothTypeValue > 15
                          ? item.DryCleanClothTypeValue.substring(0, 6) + '..'
                          : item.DryCleanClothTypeValue;
                      const dryCleanType =
                        item.DryCleanTypeValue > 10
                          ? item.DryCleanTypeValue.substring(0, 6) + '..'
                          : item.DryCleanTypeValue;
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 5,
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontFamily: "Poppins-Medium",
                              fontSize: 15,
                              width: '33%',
                            }}>
                            {cloth}
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              fontFamily: "Poppins-Medium",
                              fontSize: 15,
                              width: '33%',
                              left: -20,
                            }}>
                            {dryCleanType}
                          </Text>
                          <Text
                            style={[
                              {
                                color: 'black',
                                fontFamily: "Poppins-Medium",
                                fontSize: 15,
                                textAlign: 'right',
                                left: -30,
                              },
                            ]}>
                            {item.Quantity}
                          </Text>
                        </View>
                      )
                    }}
                  />
                </View>
              </View>
            </>
          )
        }}
        data={[1]}
        contentContainerStyle={styles.container}
      />
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

export default DetailedDryCleanOrder;
