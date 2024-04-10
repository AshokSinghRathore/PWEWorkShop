import React from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppColors } from '../../../../constants/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleForInputs } from '../../../Auth/UserDetails';
import { formatDate } from '../../../../helpers/DateFunction';
import { useSelector } from 'react-redux';
import { orderStatus } from '../../../../constants/constant';
import Share from "react-native-share"
import { PrintBill } from '../../../../helpers/PrintFunction';

const DetailedDryCleanOrder = ({ route, navigation }) => {
  const Data = useSelector(state =>
    state.DryCleanOrder.data.find(item => item.id === route.params),
  );

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
                <Text style={styles.valueText}>{
                  (!Data?.data().OrderPicked) ? "Order Picked" : !(Data?.data().InProcess) ? "Order In Process" : !(Data?.data().Packaging) ? "Order Packaging" : !(Data?.data().OutForDelivery) ? "Order Out For Delivery" : "Order Delivered"
                }
                </Text>
              </Text>

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
                {"    "}
                <AntDesign
                  name="sharealt"
                  size={22}
                  color={"red"}
                  onPress={() => {

                    const workshopAddress = `${Cred.workShopAddress} ${Cred.City} ${Cred.State} ${Cred.Pincode}`;
                    const customerAddress = `${Data?.data().Address?.House}, ${Data?.data().Address?.Area}, ${Data?.data().Address?.City}, ${Data?.data().Address?.State}, ${Data?.data().Address?.Pincode}`;
                    const CustomerName = `${Data?.data().user_name}`;
                    const ContactNumber = `${Data?.data().user_contact}`;
                    const message = `Workshop Address: ${workshopAddress}\nCustomer Address: ${customerAddress}\n Customer Name: ${CustomerName}\nContact Number: ${ContactNumber}`;
                    Share.open({
                      title: "Order Address",
                      message: message,
                    }).catch(err => {
                    });
                  }}
                />
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
              {Data?.data().status !== orderStatus[3] && !(Data?.data().Delivered) && <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UpdateOrderStatusDryClean', Data.id);
                }}
                style={StyleForInputs.SumbitButtonStyle}>
                <Text style={StyleForInputs.SumbitButtonTextStyle}>
                  Update Order Status
                </Text>
              </TouchableOpacity>}
              <TouchableOpacity
                onPress={async () => {
                  const customerAddress = `${Data?.data().Address?.House}, ${Data?.data().Address?.Area}, ${Data?.data().Address?.City}, ${Data?.data().Address?.State}, ${Data?.data().Address?.Pincode}`;
                  const CustomerName = `${Data?.data().user_name}`;
                  const ContactNumber = `${Data?.data().user_contact}`;

                  PrintBill(CustomerName, customerAddress, ContactNumber, Data?.data().DryClean,"Dry Clean")
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

export const styles = StyleSheet.create({
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
