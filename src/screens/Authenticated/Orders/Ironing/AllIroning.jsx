import { View, Text, StyleSheet, FlatList, ActivityIndicator, ToastAndroid, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import LoadingOverlay from '../../../../components/UI/LoadingOverlay';
import { styles } from '../DryClean/AllDryClean';
import OrderControlButton from '../../../../components/UI/OrderControlButton';
import { orderStatus } from '../../../../constants/constant';
import AlertPromptModal from '../../../../components/UI/AlertPrompt';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Share from "react-native-share"
import { addElementRealTimeIroning, concatIroningOrder, setIroningOrder, updateIroning } from '../../../../feature/all-feature/feature-ironing';
const AllIroning = ({ navigation }) => {
  const ServicePinCode = useSelector(state => state.ServicePinCode);
  const [screenLoader, setScreenLoader] = useState(true);
  const PAGE_SIZE = 5;
  const Dispatch = useDispatch();
  const OrderRef = firestore()
    .collection('Order')
    .where('isIroning', '==', true)
    .where('Address.Pincode', 'in', ServicePinCode.planePinCodeArray)
    .limit(PAGE_SIZE);
  const IroningOrder = useSelector(state => state.IroningOrder);
  const [showLoader, setShowLoader] = useState(false);
  const [showPrompt, setShowPrompt] = useState({
    isShow: false,
    item: {}
  });
  const [approvalLoader, setApprovalLoader] = useState(false);
  const Cred = useSelector(state => state.Cred);

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
            let isExist = IroningOrder.data.find(
              oldItem => oldItem.id == fetchedOrder.doc.id,
            );
            if (!isExist) {
              fetchedData.add(fetchedOrder.doc);
            }
          }
        });
        let newData = Array.from(fetchedData);
        if (IroningOrder.firstFetched) {
          Dispatch(
            setIroningOrder({
              data: newData,
              lastElement: newData[newData.length - 1],
            }),
          );
        } else {
          Dispatch(addElementRealTimeIroning(newData));
        }
      } catch (error) {
        console.log(error)
        ToastAndroid.show('Something Wrong Happen, Trying Again', ToastAndroid.SHORT);
      }
      setScreenLoader(false);
    },
    [IroningOrder, Dispatch],
  );

  useEffect(() => {
    const unSubscribe = OrderRef
      .onSnapshot(initialAndRealtime);

    return () => {
      unSubscribe();
    };
  }, []);



  async function fetchNext() {
    if (!IroningOrder.lastElement) {
      return;
    }
    setShowLoader(true);
    try {
      const Data = await OrderRef.startAfter(
        IroningOrder.lastElement || 0,
      ).get();
      const sendData = [...IroningOrder.data, ...Data.docs];
      Dispatch(
        concatIroningOrder({
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
      await updateRef.update(data);
      const orderGet = await updateRef.get();
      Dispatch(
        updateIroning(orderGet),
      );
      ToastAndroid.show('Order ' + status, ToastAndroid.SHORT);
    } catch (error) {
      Alert.alert('Something went wrong', 'Please try after some time');
      console.log(error)
    }
    setApprovalLoader(false);
  }

  return (
    <>
      {screenLoader ? <LoadingOverlay /> : <View style={styles.container}>
        <Text style={styles.heading}>All Ironing Orders</Text>
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={IroningOrder.data}
          keyExtractor={item => item.id}
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
            if (!IroningOrder.lastElement && showLoader) {
              return;
            }
            fetchNext();
          }}
          renderItem={({ item }) => {

            return (
              <View style={styles.orderContainer}>
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
                    navigation.navigate('DetailedIroningOrder', item.id);
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

        <AlertPromptModal placeholder={"Optional"} title={"Enter Remark"} visible={showPrompt.isShow} onSubmit={(r) => {
          orderApproval(orderStatus[3], showPrompt.item, r)
        }} onClose={() => setShowPrompt({ ...showPrompt, isShow: false })} />


      </View>}
    </>
  );
};

export default AllIroning;

export const IroningStyles = StyleSheet.create({
  IroningContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#e8f7ee",
    marginTop: 10,
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
    padding: 10
  },
  ValueText: {
    color: 'blue',
  },
  viewButtonContainer: {
    padding: 10,
    borderWidth: 1,
    width: 150,
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
    alignSelf: "flex-end",
    backgroundColor: "black"
  },
  viewButtonText: {
    textAlign: "right",
    color: "white",
    fontFamily: "Poppins-SemiBold"
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