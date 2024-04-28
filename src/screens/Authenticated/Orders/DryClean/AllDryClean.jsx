import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
  Button
} from 'react-native';
import { AppColors } from '../../../../constants/color';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import LoadingOverlay from '../../../../components/UI/LoadingOverlay';
import {
  concatDryCleanOrder,
  setDryCleanOrder,
  addElementRealTime, updateDryClean
} from '../../../../feature/all-feature/feature-dryclean';
import OrderControlButton from '../../../../components/UI/OrderControlButton';
import { orderStatus } from '../../../../constants/constant';
import AlertPromptModal from '../../../../components/UI/AlertPrompt';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Share from "react-native-share"
import { formatDate, formatTime } from '../../../../helpers/DateFunction';
import { PrintBill } from '../../../../helpers/PrintFunction';
const AllDryClean = ({ navigation }) => {
  const ConnectedBluetoothDevice = useSelector(state => state.BluetoothSlice);

  const ServicePinCode = useSelector(state => state.ServicePinCode);
  const [screenLoader, setScreenLoader] = useState(true);
  const PAGE_SIZE = 5;
  const Dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [showPrompt, setShowPrompt] = useState({
    isShow: false,
    item: {}
  });
  const [approvalLoader, setApprovalLoader] = useState(false);
  const Cred = useSelector(state => state.Cred);
  const OrderRef = firestore()
    .collection('Order')
    .where('isDryClean', '==', true)
    .where('Address.Pincode', 'in', ServicePinCode.planePinCodeArray).
    orderBy("DateOfOrder", "desc")
    .limit(PAGE_SIZE);
  const DryCleanOrder = useSelector(state => state.DryCleanOrder);

  const initialAndRealtime = useCallback(
    query => {
      if (query == null || !query) {
        setScreenLoader(false);
        return;
      }
      try {
        let fetchedData = new Set();
        query.docChanges().forEach(fetchedOrder => {
          if (fetchedOrder.type == 'added') {
            let isExist = DryCleanOrder.data.find(
              oldItem => oldItem.id == fetchedOrder.doc.id,
            );
            if (!isExist) {
              fetchedData.add(fetchedOrder.doc);
            }
          }
        });
        let newData = Array.from(fetchedData);
        if (DryCleanOrder.firstFetched) {
          Dispatch(
            setDryCleanOrder({
              data: newData,
              lastElement: newData[newData.length - 1],
            }),
          );
        } else {
          Dispatch(addElementRealTime(newData));
        }
      } catch (error) {
        ToastAndroid.show('Something Wrong Happen, Trying Again', ToastAndroid.SHORT);
      }
      setScreenLoader(false);
    },
    [DryCleanOrder, Dispatch],
  );
  useEffect(() => {
    const unSubscribe = firestore()
      .collection('Order')
      .where('isDryClean', '==', true)
      .where('Address.Pincode', 'in', ServicePinCode.planePinCodeArray)
      .orderBy('DateOfOrder', 'desc')
      .limit(PAGE_SIZE)
      .onSnapshot(initialAndRealtime);

    return () => {
      unSubscribe();
    };
  }, []);

  async function fetchNext() {
    if (!DryCleanOrder.lastElement) {
      return;
    }
    setShowLoader(true);
    try {
      const Data = await OrderRef.startAfter(
        DryCleanOrder.lastElement || 0,
      ).get();
      const sendData = [...DryCleanOrder.data, ...Data.docs];
      Dispatch(
        concatDryCleanOrder({
          data: sendData,
          lastElement: Data.docs[Data.docs.length - 1],
        }),
      );
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong', 'Please try after some time');
    }
    setShowLoader(false);
  }



  async function orderApproval(status, order, remark) {
    if (approvalLoader) {
      ToastAndroid.show('Please wait, Other Order Approval in progress', ToastAndroid.SHORT);
      return;

    }
    setApprovalLoader(true);
    try {
      const updateRef = firestore().collection('Order').doc(order.id);
      let data = {
        status: status,
      }
      if (remark) {
        data['remark'] = remark
      }
      if (status==orderStatus[3]){
        data["OutForDelivery"] = true
      }
      await updateRef.update(data);
      const orderGet = await updateRef.get();
      Dispatch(
        updateDryClean(orderGet),
      );
      ToastAndroid.show('Order ' + status, ToastAndroid.SHORT);
      if (status == orderStatus[2]) {

        if (!ConnectedBluetoothDevice.boundAddress || !ConnectedBluetoothDevice.name) {
          Alert.alert("Alert", "Printer Not Connected")
        }

        try {
          const customerAddress = `${order?.data().Address?.House}, ${order?.data().Address?.Area}, ${order?.data().Address?.City}, ${order?.data().Address?.State}, ${order?.data().Address?.Pincode}`;
          const CustomerName = `${order?.data().user_name}`;
          const ContactNumber = `${order?.data().user_contact}`;
          let price = {
            price: order?.data().price,
            delivery: order?.data().deliveryCharge
          }
          let pickorder = {
            date: order && order.data().PickDate
              ? formatDate(new Date(order.data().PickDate))
              : 'Not Assign',
            time: order?.data().Picktime || 'Not Assign'
          }
          let Droporder = {
            date: order && order.data().DropDate
              ? formatDate(new Date(order.data().DropDate))
              : 'Not Assign',
            time: order?.data().Droptime || 'Not Assign'
          }
          await PrintBill(CustomerName, customerAddress, ContactNumber, order?.data().DryClean, "Dry Clean", price, pickorder, Droporder)
        }
        catch (error) {
          console.log(error)
          Alert.alert("Something went wrong", "Please try after some time")
        }

      }
    } catch (error) {
      Alert.alert('Something went wrong', 'Please try after some time');
      console.log(error)
    }
    setApprovalLoader(false);
  }

  return (
    <>
      {screenLoader ? (
        <LoadingOverlay />
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.heading}>All DryClean Orders</Text>

            <FlatList
              contentContainerStyle={{ paddingBottom: 20 }}
              data={DryCleanOrder.data}
              keyExtractor={item => new Date().toString() + Math.random() + " " + Math.random() / 2}
              ListFooterComponent={() => {
                return (
                  <>
                    {showLoader && (
                      <ActivityIndicator size={'small'} color={'black'} />
                    )}
                  </>
                );
              }}
              onEndReached={() => {
                if (!DryCleanOrder.lastElement && showLoader) {
                  return;
                }
                fetchNext();
              }}
              renderItem={({ item }) => {
                const time = formatTime(item.data().DateOfOrder.toDate())
                return (
                  <View style={styles.orderContainer}>

                    <Text style={styles.valueText}>
                      {time}
                    </Text>
                    <Text style={styles.detailText}>
                      Customer Name :{' '}
                      <Text style={styles.valueText}>
                        {item.data().user_name}
                      </Text>
                    </Text>
                    <Text style={styles.detailText}>
                      Customer Contact : <Text style={styles.valueText}>{item?.data().user_contact}</Text>
                    </Text>
                    <Text style={styles.detailText}>
                      Address:{' '}
                      <Text style={styles.valueText}>
                        {item?.data().Address?.House +
                          ', ' +
                          item?.data().Address?.Area +
                          ', ' +
                          item?.data().Address?.City +
                          ', ' +
                          item?.data().Address?.State +
                          ', ' +
                          item?.data().Address?.Pincode}
                      </Text>
                      {"    "}
                      <AntDesign
                        name="sharealt"
                        size={22}
                        color={"red"}
                        onPress={() => {

                          const workshopAddress = `${Cred.workShopAddress} ${Cred.City} ${Cred.State} ${Cred.Pincode}`;
                          const customerAddress = `${item?.data().Address?.House}, ${item?.data().Address?.Area}, ${item?.data().Address?.City}, ${item?.data().Address?.State}, ${item?.data().Address?.Pincode}`;
                          const CustomerName = `${item?.data().user_name}`;
                          const ContactNumber = `${item?.data().user_contact}`;
                          const message = `Workshop Address: ${workshopAddress}\nCustomer Address: ${customerAddress}\nCustomer Name: ${CustomerName}\nContact Number: ${ContactNumber}`;
                          Share.open({
                            title: "Order Address",
                            message: message,
                          }).catch(err => {
                          });
                        }}
                      />
                    </Text>
                    <OrderControlButton
                      status={item.data().status}

                      onPress={() => {
                        navigation.navigate('DetailedDryCleanOrder', item.id);
                      }}
                      label={"View Details"}
                      onCheck={() => orderApproval(orderStatus[2], item)}
                      onCross={() => {
                        setShowPrompt({ isShow: true, item: item })
                      }}
                    />

                  </View>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <Text
                    style={{
                      color: 'white',
                      marginTop: 40,
                      textAlign: 'center',
                      fontSize: 18,
                      fontFamily: 'Poppins-SemiBold',
                    }}>

                    No Orders
                  </Text>
                );
              }}
            />

          </View>

        </>
      )}
      <AlertPromptModal placeholder={"Optional"} title={"Enter Remark"} visible={showPrompt.isShow} onSubmit={(r) => {
        orderApproval(orderStatus[3], showPrompt.item, r)
      }} onClose={() => setShowPrompt({ ...showPrompt, isShow: false })} />


    </>
  );
};




export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: AppColors.statusBarColor,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.statusBarColor,
    paddingHorizontal: 10,
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
