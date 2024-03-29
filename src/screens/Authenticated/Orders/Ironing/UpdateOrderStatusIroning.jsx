import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CustomButton from '../../../../components/UI/CustomButton';
import firestore from '@react-native-firebase/firestore';

import { updateIroning } from '../../../../feature/all-feature/feature-ironing';
const UpdateOrderStatusIroning = ({ route, navigation }) => {
  const IroningOrder = useSelector(state => state.IroningOrder.data);
  const [data, setData] = useState(IroningOrder.find(item => item.id === route.params));
  const [check, setCheck] = useState(false);
  const Dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  async function updateOrderStatus() {
    setLoader(true);
    try {
      const orderRef = firestore().collection('Order').doc(route.params);
      let newOrderGet;
      if (!data.data().OrderPicked) {
        await orderRef.update({ "OrderPicked": true });
        newOrderGet = await orderRef.get();
        Dispatch(updateIroning(newOrderGet))
      } else if (!data.data().InProcess) {
        await orderRef.update({ "InProcess": true });
        newOrderGet = await orderRef.get();
        Dispatch(updateIroning(newOrderGet))
      } else if (!data.data().Packaging) {
        await orderRef.update({ "Packaging": true });
        newOrderGet = await orderRef.get();
        Dispatch(updateIroning(newOrderGet))
      } else if (!data.data().OutForDelivery) {
        await orderRef.update({ "OutForDelivery": true });
        newOrderGet = await orderRef.get();
        Dispatch(updateIroning(newOrderGet))
      } else {
        await orderRef.update({ "Delivered": true });
        newOrderGet = await orderRef.get();
        Dispatch(updateIroning(newOrderGet))
      }

      navigation.goBack()


    } catch (error) {
      console.log(error)
      Alert.alert('Something went wrong', 'Please try after some time');
    }
    setLoader(false);
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>Update Order Status</Text>
      <TouchableOpacity
        onPress={() => setCheck(!check)}
        style={[
          {
            alignSelf: 'center',
            marginTop: 30,
            borderWidth: 1,
            borderRadius: 7,
            borderColor: "grey",
            width: '90%',
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }
        ]}>

        <Text
          style={[
            {
              fontSize: 18,
              color: 'black',
              fontFamily: 'Poppins-SemiBold',
            }
          ]}>
          {
            (!data?.data().OrderPicked) ? "Order Picked" : !(data?.data().InProcess) ? "Order In Process" : !(data?.data().Packaging) ? "Order Packaging" : !(data?.data().OutForDelivery) ? "Order Out For Delivery" : "Order Delivered"
          }

        </Text>

        <BouncyCheckbox
          size={28}
          isChecked={check}
          fillColor="green"
          onPress={() => setCheck(!check)}
          disableText
          disableBuiltInState
        />
      </TouchableOpacity>
      <CustomButton showLoader={loader} label={'Update Status'} onPress={() => {
        if (loader && !check) return;

        updateOrderStatus();

      }} />
    </View>
  )
}

export default UpdateOrderStatusIroning;