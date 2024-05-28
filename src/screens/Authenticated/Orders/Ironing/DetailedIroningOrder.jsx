import React from 'react';
import {View, Text, StyleSheet, Alert, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleForInputs} from '../../../Auth/UserDetails';
import {styles} from '../DryClean/DetailedDryCleanOrder';
import {formatDate} from '../../../../helpers/DateFunction';
import {useSelector} from 'react-redux';
import {orderStatus} from '../../../../constants/constant';
import Share from 'react-native-share';
import {getUrlForDirections} from '../../../../helpers/utilsfunction';
import {PrintBill} from '../../../../helpers/PrintFunction';

const DetailedIroningOrder = ({route, navigation}) => {
  const Data = useSelector(state =>
    state.IroningOrder.data.find(item => item.id === route.params),
  );
  const ConnectedBluetoothDevice = useSelector(state => state.BluetoothSlice);
  const Cred = useSelector(state => state.Cred);

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
                Order Status:{' '}
                <Text style={styles.valueText}>
                  {!Data?.data().OrderPicked
                    ? 'Order Picked'
                    : !Data?.data().InProcess
                    ? 'Order In Process'
                    : !Data?.data().Packaging
                    ? 'Order Packaging'
                    : !Data?.data().OutForDelivery
                    ? 'Order Out For Delivery'
                    : 'Order Delivered'}
                </Text>
              </Text>
              <Text style={styles.detailText}>
                Customer Name:{' '}
                <Text style={styles.valueText}>{Data?.data().user_name}</Text>
              </Text>
              <Text style={styles.detailText}>
                Customer Contact:{' '}
                <Text style={styles.valueText}>
                  {Data?.data().user_contact}
                </Text>
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
                {'    '}
                <AntDesign
                  name="sharealt"
                  size={22}
                  color={'red'}
                  onPress={() => {
                    const workshopAddress = `${Cred.workShopAddress} ${Cred.City} ${Cred.State} ${Cred.Pincode}`;
                    const customerAddress = `${Data?.data().Address?.House}, ${
                      Data?.data().Address?.Area
                    }, ${Data?.data().Address?.City}, ${
                      Data?.data().Address?.State
                    }, ${Data?.data().Address?.Pincode}`;
                    const CustomerName = `${Data?.data().user_name}`;
                    const ContactNumber = `${Data?.data().user_contact}`;
                    const message = `Workshop Address: ${workshopAddress}\nCustomer Address: ${customerAddress}\n Customer Name: ${CustomerName}\nContact Number: ${ContactNumber}`;
                    Share.open({
                      title: 'Order Address',
                      message: message,
                    }).catch(err => {});
                  }}
                />
              </Text>
              <Text style={styles.detailText}>
                Packaging Type:{' '}
                <Text style={styles.valueText}>{Data?.data().packageType}</Text>
              </Text>
              <Text style={[styles.detailText]}>
                Delivery Price:{' '}
                <Text style={styles.valueText}>
                  {' '}
                  ₹ {Data?.data().deliveryCharge}
                </Text>
              </Text>

              <Text style={[styles.detailText]}>
                Packaging Price:{' '}
                <Text style={styles.valueText}>
                  {' '}
                  ₹ {Data?.data().packagePrice}
                </Text>
              </Text>
              <Text style={[styles.detailText]}>
                Price:{' '}
                <Text style={styles.valueText}>
                  {' '}
                  ₹ {Data?.data().price}{' '}
                  {Data?.data().usePoints || Data?.data().useWallets
                    ? `(${Data?.data().usePoints ? 'Points ' : ''} ${
                        Data?.data().usePoints && Data?.data().useWallets
                          ? '/'
                          : ''
                      } ${Data?.data().useWallets ? 'Wallet' : ''} Used )`
                    : ''}
                </Text>
              </Text>
              <Text style={[styles.detailText]}>
                Payment Method:{' '}
                <Text style={styles.valueText}>
                  {' '}
                  {Data?.data().paymentMethod}
                </Text>
              </Text>
              {Data?.data().paymentId && (
                <Text style={[styles.detailText]}>
                  Payment Id:{' '}
                  <Text style={styles.valueText}>
                    {' '}
                    {Data?.data().paymentId}
                  </Text>
                </Text>
              )}
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: 'grey',
                  marginBottom: 10,
                }}
              />
              {Data?.data().status !== orderStatus[3] && (
                <TouchableOpacity
                  onPress={() => {
                    let cpData = {...Data.data(), id: Data.id};
                    delete cpData.DateOfOrder;
                    navigation.navigate('EditIroningOrder', cpData);
                  }}
                  style={StyleForInputs.SumbitButtonStyle}>
                  <Text style={StyleForInputs.SumbitButtonTextStyle}>Edit</Text>
                </TouchableOpacity>
              )}
              {Data?.data().status !== orderStatus[3] &&
                !Data?.data().Delivered && (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('UpdateOrderStatusIroning', Data?.id);
                    }}
                    style={StyleForInputs.SumbitButtonStyle}>
                    <Text style={StyleForInputs.SumbitButtonTextStyle}>
                      Update Order Status
                    </Text>
                  </TouchableOpacity>
                )}
              <TouchableOpacity
                onPress={async () => {
                  if (
                    !ConnectedBluetoothDevice.boundAddress ||
                    !ConnectedBluetoothDevice.name
                  ) {
                    Alert.alert('Alert', 'Printer Not Connected');
                    return;
                  }
                  try {
                    const customerAddress = `${Data?.data().Address?.House}, ${
                      Data?.data().Address?.Area
                    }, ${Data?.data().Address?.City}, ${
                      Data?.data().Address?.State
                    }, ${Data?.data().Address?.Pincode}`;
                    const CustomerName = `${Data?.data().user_name}`;
                    const ContactNumber = `${Data?.data().user_contact}`;
                    let price = {
                      price: Data?.data().price,
                      delivery: Data?.data().deliveryCharge,
                    };
                    let pickData = {
                      date:
                        Data && Data.data().PickDate
                          ? formatDate(new Date(Data.data().PickDate))
                          : 'Not Assign',
                      time: Data?.data().Picktime || 'Not Assign',
                    };
                    let DropData = {
                      date:
                        Data && Data.data().DropDate
                          ? formatDate(new Date(Data.data().DropDate))
                          : 'Not Assign',
                      time: Data?.data().Droptime || 'Not Assign',
                    };
                    await PrintBill(
                      CustomerName,
                      customerAddress,
                      ContactNumber,
                      Data?.data().Ironing,
                      'Ironing',
                      price,
                      pickData,
                      DropData,
                      Data?.data().paymentMethod,
                    );
                  } catch (error) {
                    console.log(error);
                    Alert.alert(
                      'Something went wrong',
                      'Please try after some time',
                    );
                  }
                }}
                style={StyleForInputs.SumbitButtonStyle}>
                <Text style={StyleForInputs.SumbitButtonTextStyle}>
                  Print Bill
                </Text>
              </TouchableOpacity>
              <View style={{marginTop: 20}}>
                <Text style={StyleForInputs.HeaderText}>Order Details</Text>
                <View
                  style={{
                    width: '100%',
                    borderTopWidth: 0.8,
                    borderTopColor: 'black',
                  }}>
                  <FlatList
                    keyExtractor={item => item.Date}
                    data={Data?.data().Ironing}
                    renderItem={({item}) => {
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
                                fontFamily: 'Poppins-Medium',
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
                                fontFamily: 'Poppins-Medium',
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
                                  fontFamily: 'Poppins-Medium',
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
          );
        }}
        data={[1]}
        contentContainerStyle={styles.container}
      />
    </>
  );
};

export default DetailedIroningOrder;
