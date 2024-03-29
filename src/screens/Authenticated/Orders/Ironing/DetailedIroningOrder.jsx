import React from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppColors } from '../../../../constants/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleForInputs } from '../../../Auth/UserDetails';
import { styles } from '../DryClean/DetailedDryCleanOrder';
import { formatDate } from '../../../../helpers/DateFunction';
import { useSelector } from 'react-redux';
import { orderStatus } from '../../../../constants/constant';

const DetailedIroningOrder = ({ route, navigation }) => {
  const Data = useSelector(state =>
    state.IroningOrder.data.find(item => item.id === route.params),
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
                <Text style={styles.valueText}>{Data?.data().Ironing?.length}</Text>
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
                Packaging Price:{' '}
                <Text style={styles.valueText}> ₹ {Data?.data().packagePrice}</Text>
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
                  console.log(cpData)
                  delete cpData.DateOfOrder;
                  navigation.navigate('EditIroningOrder', cpData);
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
                    data={Data?.data().Ironing}
                    renderItem={({ item }) => {

                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 5,
                            marginBottom: 5,
                          }}>
                          {item.ClothType && (
                            <Text
                              style={{
                                fontSize: 15,
                                color: 'black',
                                fontFamily: "Poppins-Medium",
                                width: '33%',
                              }}>
                              {item.ClothType}
                            </Text>
                          )}
                          {item.PressType && (
                            <Text
                              style={{
                                fontSize: 15,
                                color: 'black',
                                fontFamily: "Poppins-Medium",
                                width: '33%',
                              }}>
                              {item.PressType}
                            </Text>
                          )}
                          {item.Quantity && (
                            <Text
                              style={[
                                {
                                  fontSize: 15,
                                  color: 'black',
                                  fontFamily: "Poppins-Medium",
                                  textAlign: 'right',
                                  left: -20,
                                  width: 40,
                                },
                                
                              ]}>
                              {item.Quantity}
                            </Text>
                          )}
                        </View>
                      );
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



export default DetailedIroningOrder;
