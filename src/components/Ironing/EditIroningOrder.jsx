import { View, Text, Modal, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import { StyleForInputs } from '../../screens/Authenticated/Profile/EditProfile';
import { formatDate } from '../../helpers/DateFunction';
import CustomButton from '../UI/CustomButton';
import CustomDropdown from '../CustomDropdown';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { updateDryClean } from '../../feature/all-feature/feature-dryclean';
import CustomTextInput from '../UI/CustomTextInput';
import { updateIroning } from '../../feature/all-feature/feature-ironing';
const timeSlots = [
  { id: 1, value: '08:00', label: '08:00 - 08:15' },
  { id: 2, value: '08:15', label: '08:15 - 08:30' },
  { id: 3, value: '08:30', label: '08:30 - 08:45' },
  { id: 4, value: '08:45', label: '08:45 - 09:00' },
  { id: 5, value: '09:00', label: '09:00 - 09:15' },
  { id: 6, value: '09:15', label: '09:15 - 09:30' },
  { id: 7, value: '09:30', label: '09:30 - 09:45' },
  { id: 8, value: '09:45', label: '09:45 - 10:00' },
  { id: 9, value: '10:00', label: '10:00 - 10:15' },
  { id: 10, value: '10:15', label: '10:15 - 10:30' },
  { id: 11, value: '10:30', label: '10:30 - 10:45' },
  { id: 12, value: '10:45', label: '10:45 - 11:00' },
  { id: 13, value: '11:00', label: '11:00 - 11:15' },
  { id: 14, value: '11:15', label: '11:15 - 11:30' },
  { id: 15, value: '11:30', label: '11:30 - 11:45' },
  { id: 16, value: '11:45', label: '11:45 - 12:00' },
  { id: 17, value: '12:00', label: '12:00 - 12:15' },
  { id: 18, value: '12:15', label: '12:15 - 12:30' },
  { id: 19, value: '12:30', label: '12:30 - 12:45' },
  { id: 20, value: '12:45', label: '12:45 - 13:00' },
  { id: 21, value: '13:00', label: '13:00 - 13:15' },
  { id: 22, value: '13:15', label: '13:15 - 13:30' },
  { id: 23, value: '13:30', label: '13:30 - 13:45' },
  { id: 24, value: '13:45', label: '13:45 - 14:00' },
  { id: 25, value: '14:00', label: '14:00 - 14:15' },
  { id: 26, value: '14:15', label: '14:15 - 14:30' },
  { id: 27, value: '14:30', label: '14:30 - 14:45' },
  { id: 28, value: '14:45', label: '14:45 - 15:00' },
  { id: 29, value: '15:00', label: '15:00 - 15:15' },
  { id: 30, value: '15:15', label: '15:15 - 15:30' },
  { id: 31, value: '15:30', label: '15:30 - 15:45' },
  { id: 32, value: '15:45', label: '15:45 - 16:00' },
  { id: 33, value: '16:00', label: '16:00 - 16:15' },
  { id: 34, value: '16:15', label: '16:15 - 16:30' },
  { id: 35, value: '16:30', label: '16:30 - 16:45' },
  { id: 36, value: '16:45', label: '16:45 - 17:00' },
  { id: 37, value: '17:00', label: '17:00 - 17:15' },
  { id: 38, value: '17:15', label: '17:15 - 17:30' },
  { id: 39, value: '17:30', label: '17:30 - 17:45' },
  { id: 40, value: '17:45', label: '17:45 - 18:00' },
  { id: 41, value: '18:00', label: '18:00 - 18:15' },
  { id: 42, value: '18:15', label: '18:15 - 18:30' },
  { id: 43, value: '18:30', label: '18:30 - 18:45' },
  { id: 44, value: '18:45', label: '18:45 - 19:00' },
  { id: 45, value: '19:00', label: '19:00 - 19:15' },
  { id: 46, value: '19:15', label: '19:15 - 19:30' },
  { id: 47, value: '19:30', label: '19:30 - 19:45' },
  { id: 48, value: '19:45', label: '19:45 - 20:00' },
  { id: 49, value: '20:00', label: '20:00 - 20:15' },
  { id: 50, value: '20:15', label: '20:15 - 20:30' },
  { id: 51, value: '20:30', label: '20:30 - 20:45' },
  { id: 52, value: '20:45', label: '20:45 - 21:00' },
];
const EditIroningOrder = ({ route, navigation }) => {
  const [data, setData] = useState(route.params);
  const [openDropDate, setOpenDropDate] = useState(false);
  const dropTimeRef = React.useRef();
  const dispatch = useDispatch();
  const [buttonLoader, setButtonLoader] = useState(false);
  const [remark, setRemark] = useState('');
  const orders = useSelector(state => state.IroningOrder.data);
  const openModalDropTime = () => {
    dropTimeRef.current?.open();
  };


  useEffect(() => {
    const dropTime = timeSlots.find(item => item.label == route.params.Droptime);
    setData({
      ...data,
      Droptime: dropTime ? dropTime : null,
    });
  }, []);
  async function onUpdateOrder() {
    if (!data.DropDate || !data.Droptime?.label || !data.price) {
      Alert.alert('Invalid Input', 'Please select Drop Date and Drop Time');
      return;
    }
    setButtonLoader(true);
    try {
      const respRef = firestore().collection('Order').doc(data.id);

      await respRef.update({
        DropDate: new Date(data.DropDate).toISOString(),
        Droptime: data.Droptime?.label,
        price: parseInt(data.price),
        remark: data.remark ? data.remark : ""
      });

      const dataGet = await respRef.get();
      dispatch(
        updateIroning(dataGet),
      );
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Something went wrong',
        'Please try after some time sssss' + error,
      );
    }
    setButtonLoader(false);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '90%',
          paddingVertical: 10,
          paddingHorizontal: 4,
          backgroundColor: 'white',
          borderRadius: 8,
        }}>
        <Text style={[StyleForInputs.InputTextHeader, { alignSelf: "center" }]}>Edit Dry Clean Order</Text>
        <Pressable
          onPress={() => setOpenDropDate(true)}
          style={{
            backgroundColor: '#e8f7ee',
            alignItems: 'center',
            padding: 5,
            marginTop: 10,
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={StyleForInputs.InputTextHeader}>Drop Date</Text>
          <Text style={[StyleForInputs.InputTextHeader, { color: 'black' }]}>
            {data && data.DropDate
              ? formatDate(new Date(data.DropDate))
              : 'Not Assign'}
          </Text>
        </Pressable>
        <Pressable
          onPress={openModalDropTime}
          style={{
            backgroundColor: '#e8f7ee',
            alignItems: 'center',
            padding: 5,
            marginTop: 10,
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={StyleForInputs.InputTextHeader}>Drop Time</Text>
          <Text style={[StyleForInputs.InputTextHeader, { color: 'black' }]}>
            {data.Droptime ? data.Droptime.label : 'Not Assign'}
          </Text>
        </Pressable>
        <Text style={[StyleForInputs.InputTextHeader, { marginLeft: 20, marginTop: 5 }]}>₹ Price</Text>
        <CustomTextInput
          label={'Price'}
          value={data?.price.toString()}
          onChangeText={
            (text) => {
              const isValidInteger = /^\d+$/.test(text);

              if (!isValidInteger && text !== '') {
                Alert.alert('Invalid Input', 'Please enter a valid integer');
              } else {
                setData({ ...data, price: text });
              }
            }
          }
          placeHolder={'Price'}
          placeHolderColor={'#a8a8a8'}
          Style={{ backgroundColor: '#e8f7ee', marginTop: 0 }}
        />
        <Text style={[StyleForInputs.InputTextHeader, { marginLeft: 20, marginTop: 5 }]}>Remark (Optional)</Text>
        <CustomTextInput
          label={'Remark'}
          value={data?.remark}
          onChangeText={
            (text) => {
              setData({ ...data, remark: text });
            }
          }
          placeHolder={''}
          placeHolderColor={'#a8a8a8'}
          Style={{ backgroundColor: '#e8f7ee', marginTop: 0 }}
        />
        <CustomButton
          showLoader={buttonLoader}
          onPress={() => {
            if (buttonLoader) return;
            onUpdateOrder();
          }}
          label="Update Order"
        />
      </View>

      <DatePicker
        minimumDate={new Date()}
        mode="date"
        theme="light"
        modal
        open={openDropDate}
        date={data.DropDate ? new Date(data.DropDate) : new Date()}
        onCancel={() => setOpenDropDate(false)}
        onConfirm={date => {
          setData({ ...data, DropDate: date });
          setOpenDropDate(false);
        }}
      />
      <CustomDropdown
        keyAccess={'id'}
        access={'label'}
        customDropdownRef={dropTimeRef}
        noDataLine={'No Drop Time Available'}
        data={timeSlots}
        onPress={item => setData({ ...data, Droptime: item })}
        label={'Drop Time'}
      />
    </View>
  );
};

export default EditIroningOrder;
