import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import CustomButton from '../../../components/UI/CustomButton';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {orderStatus} from '../../../constants/constant';
import {CommonActions} from '@react-navigation/native';
import { deleteAllFromTempCart } from '../../../feature/all-feature/feature-tempcart';
const FinalCartDryClean = ({navigation, route}) => {
  const MainData = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dryCleanCharge, setDryCleanCharge] = useState(
    MainData.price.toString(),
  );
  const [deliveryCharge, setDeliveryCharge] = useState('');
  const [tax, setTax] = useState('');
  const [name, setName] = useState('');
  const Selector = useSelector(state => state.TempCartItems);
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState({
    House: '',
    City: '',
    Area: '',
    State: '',
    Pincode: '',
  });

  async function createOrder() {
    setLoading(true);
    try {
      const expireDate = new Date();
      expireDate.setMonth(expireDate.getMonth() + 6);
      let data = {
        user_name: name,
        user_contact: number,
        DryClean: Selector.DryClean,
        Address: address,
        packageType: '',
        PickDate: MainData.PickDate,
        Picktime: MainData.PickTime,
        user_uid: 'admin_created_order',
        price: dryCleanCharge,
        deliveryCharge: parseFloat(deliveryCharge),
        usePoints: false,
        useWallets: false,
        DateOfOrder: new Date(),
        isDryClean: true,
        OrderPicked: false,
        InProcess: false,
        Packaging: false,
        OutForDelivery: false,
        Delivered: false,
        expireDate: expireDate,
        paymentMethod: 'COD',
        isBasketFree: false,
        status: orderStatus[2],
        totalPrice:
          eval(parseFloat(deliveryCharge) + parseFloat(dryCleanCharge)) +
          (eval(parseFloat(deliveryCharge) + parseFloat(dryCleanCharge)) *
            parseInt(tax)) /
            100,
        taxApplicable: tax,
        isMember: {
          active: false,
        },
      };
      const orderRef = firestore().collection('Order').doc();
      await orderRef.set(data);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Dashboard'}],
        }),
      );
      dispatch(deleteAllFromTempCart())
    } catch (error) {
      Alert.alert('Error', error?.message || 'An error occured');
    }
    setLoading(false);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter Customer name"
      />

      <Text style={styles.label}>Number:</Text>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber}
        placeholder="Enter Customer number"
      />
      <Text style={styles.label}>Tax:</Text>
      <TextInput
        style={styles.input}
        value={tax}
        onChangeText={setTax}
        placeholder="Enter Tax (%)"
      />
      <Text style={styles.label}>Dry Clean Charge:</Text>
      <TextInput
        style={styles.input}
        value={dryCleanCharge}
        onChangeText={setDryCleanCharge}
        placeholder="Enter dry clean charge"
      />

      <Text style={styles.label}>Delivery Charge:</Text>
      <TextInput
        style={styles.input}
        value={deliveryCharge}
        onChangeText={setDeliveryCharge}
        placeholder="Enter delivery charge"
      />

      <Text style={styles.label}>Address:</Text>
      <View style={styles.addressContainer}>
        <TextInput
          style={[styles.input, styles.addressInput]}
          value={address.House}
          onChangeText={text => setAddress({...address, House: text})}
          placeholder="House"
        />
        <TextInput
          style={[styles.input, styles.addressInput]}
          value={address.City}
          onChangeText={text => setAddress({...address, City: text})}
          placeholder="City"
        />
        <TextInput
          style={[styles.input, styles.addressInput]}
          value={address.Area}
          onChangeText={text => setAddress({...address, Area: text})}
          placeholder="Area"
        />
        <TextInput
          style={[styles.input, styles.addressInput]}
          value={address.State}
          onChangeText={text => setAddress({...address, State: text})}
          placeholder="State"
        />
        <TextInput
          style={[styles.input, styles.addressInput]}
          value={address.Pincode}
          onChangeText={text => setAddress({...address, Pincode: text})}
          placeholder="Pincode"
        />
        <CustomButton
          showLoader-={loading}
          onPress={() => {
            if (!loading) createOrder();
          }}
          label={'Submit'}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  addressContainer: {
    marginBottom: 10,
  },
  addressInput: {
    marginBottom: 5,
  },
});

export default FinalCartDryClean;
