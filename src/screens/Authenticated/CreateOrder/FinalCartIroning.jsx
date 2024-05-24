import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../../components/UI/CustomButton';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {orderStatus} from '../../../constants/constant';
import {CommonActions} from '@react-navigation/native';
import {deleteAllFromTempCart} from '../../../feature/all-feature/feature-tempcart';
import CustomDropdown from '../../../components/CustomDropdown';

const packageTypeData = [
  {
    id: 1,
    label: 'Semi-Permium',
    price: 20,
  },
  {
    id: 2,
    label: 'Permium',
    price: 40,
  },
  {
    id: 3,
    label: 'Normal',
    price: 0,
  },
];

const FinalCartIroning = ({navigation, route}) => {
  const MainData = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [ironingCharge, setIroningCharge] = useState(MainData.price.toString());
  const [deliveryCharge, setDeliveryCharge] = useState('');
  const [tax, setTax] = useState('');
  const [name, setName] = useState('');
  const Selector = useSelector(state => state.TempCartItems);
  const [packageType, setPackageType] = useState({});
  console.log(packageType);
  const packageTypeRef = useRef(null);
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState({
    House: '',
    City: '',
    Area: '',
    State: '',
    Pincode: '',
  });

  async function createOrder() {


    if(!name||!number||!ironingCharge||!deliveryCharge||!packageType?.label){

      Alert.alert('Error','Please fill all the fields');
      return
    }

    setLoading(true);
    try {
      const expireDate = new Date();
      expireDate.setMonth(expireDate.getMonth() + 6);
      let data = {
        totalPrice:
        eval(parseFloat(deliveryCharge) + parseFloat(ironingCharge)) +
        (eval(parseFloat(deliveryCharge) + parseFloat(ironingCharge)) *
          parseInt(tax)) /
          100,
          user_name: name,
          user_contact: number,
        Ironing: Selector.Ironing,
        Address: address,
        packageType:packageType?.label,
        PickDate: MainData.PickDate,
        DropDate: MainData.DropDate,
        Picktime: MainData.PickTime,
        Droptime: MainData.DropTime,
        user_uid: 'admin_created_order',
        price: ironingCharge,
        deliveryCharge: deliveryCharge,
        DateOfOrder: new Date(),
        isIroning: true,
        OrderPicked: false,
        InProcess: false,
        Packaging: false,
        OutForDelivery: false,
        Delivered: false,
        expireDate: expireDate,
        usePoints: false,
        useWallets: false,
        paymentMethod: 'COD',
        isBasketFree:  false,
        packagePrice: packageType?.price || 0,
        status: orderStatus[2],
        taxApplicable: tax || 0,
        isMember:{
          active:false
        }
      };
      const orderRef = firestore().collection('Order').doc();
      await orderRef.set(data);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Dashboard'}],
        }),
      );
      dispatch(deleteAllFromTempCart());
    } catch (error) {
      Alert.alert('Error', error?.message || 'An error occured');
    }
    setLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={{paddingBottom:40}} style={styles.container}>
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
      <Text style={styles.label}>Ironing Charge:</Text>
      <TextInput
        style={styles.input}
        value={ironingCharge}
        onChangeText={setIroningCharge}
        placeholder="Enter dry clean charge"
      />

      <Text style={styles.label}>Delivery Charge:</Text>
      <TextInput
        style={styles.input}
        value={deliveryCharge}
        onChangeText={setDeliveryCharge}
        placeholder="Enter delivery charge"
      />

      <TouchableOpacity
        onPress={() => packageTypeRef.current?.open()}
        style={{
          marginVertical: 14,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderWidth: 0.7,
          borderColor: 'black',
          padding: 10,
          flexDirection: 'row',
          borderRadius: 10,
        }}>
        <Text style={[styles.label,{fontSize:16}]}>Packaging Type</Text>
        <Text style={[styles.label,{fontSize:16}]}>{packageType?.label || 'Select Type'}</Text>
      </TouchableOpacity>
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
      <CustomDropdown
        access={'label'}
        anotherAccess={'price'}
        data={packageTypeData}
        customDropdownRef={packageTypeRef}
        keyAccess={'id'}
        label={'Package Type'}
        noCenter={true}
        onPress={item => {
          setPackageType(item);
        }}
      />
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

export default FinalCartIroning;
