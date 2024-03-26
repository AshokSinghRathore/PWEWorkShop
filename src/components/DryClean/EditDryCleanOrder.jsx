import {View, Text, Modal, Pressable, Alert} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import {StyleForInputs} from '../../screens/Authenticated/Profile/EditProfile';
import {formatDate} from '../../helpers/DateFunction';
import CustomButton from '../UI/CustomButton';
import CustomDropdown from '../CustomDropdown';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {updateDryClean} from '../../feature/all-feature/feature-dryclean';
const timeSlots = [
  {id: 1, value: '08:00', label: '08:00 - 08:15'},
  {id: 2, value: '08:15', label: '08:15 - 08:30'},
  {id: 3, value: '08:30', label: '08:30 - 08:45'},
  {id: 4, value: '08:45', label: '08:45 - 09:00'},
  {id: 5, value: '09:00', label: '09:00 - 09:15'},
  {id: 6, value: '09:15', label: '09:15 - 09:30'},
  {id: 7, value: '09:30', label: '09:30 - 09:45'},
  {id: 8, value: '09:45', label: '09:45 - 10:00'},
  {id: 9, value: '10:00', label: '10:00 - 10:15'},
  {id: 10, value: '10:15', label: '10:15 - 10:30'},
  {id: 11, value: '10:30', label: '10:30 - 10:45'},
  {id: 12, value: '10:45', label: '10:45 - 11:00'},
  {id: 13, value: '11:00', label: '11:00 - 11:15'},
  {id: 14, value: '11:15', label: '11:15 - 11:30'},
  {id: 15, value: '11:30', label: '11:30 - 11:45'},
  {id: 16, value: '11:45', label: '11:45 - 12:00'},
  {id: 17, value: '12:00', label: '12:00 - 12:15'},
  {id: 18, value: '12:15', label: '12:15 - 12:30'},
  {id: 19, value: '12:30', label: '12:30 - 12:45'},
  {id: 20, value: '12:45', label: '12:45 - 13:00'},
  {id: 21, value: '13:00', label: '13:00 - 13:15'},
  {id: 22, value: '13:15', label: '13:15 - 13:30'},
  {id: 23, value: '13:30', label: '13:30 - 13:45'},
  {id: 24, value: '13:45', label: '13:45 - 14:00'},
  {id: 25, value: '14:00', label: '14:00 - 14:15'},
  {id: 26, value: '14:15', label: '14:15 - 14:30'},
  {id: 27, value: '14:30', label: '14:30 - 14:45'},
  {id: 28, value: '14:45', label: '14:45 - 15:00'},
  {id: 29, value: '15:00', label: '15:00 - 15:15'},
  {id: 30, value: '15:15', label: '15:15 - 15:30'},
  {id: 31, value: '15:30', label: '15:30 - 15:45'},
  {id: 32, value: '15:45', label: '15:45 - 16:00'},
  {id: 33, value: '16:00', label: '16:00 - 16:15'},
  {id: 34, value: '16:15', label: '16:15 - 16:30'},
  {id: 35, value: '16:30', label: '16:30 - 16:45'},
  {id: 36, value: '16:45', label: '16:45 - 17:00'},
];
const EditDryCleanOrder = ({route, navigation}) => {
  const [data, setData] = useState(route.params);
  const [openDropDate, setOpenDropDate] = useState(false);
  const dropTimeRef = React.useRef();
  const dispatch = useDispatch();
  const [buttonLoader, setButtonLoader] = useState(false);
  const openModalDropTime = () => {
    dropTimeRef.current?.open();
  };

  async function onUpdateOrder() {
    if (!data.DropDate || !data.Droptime) {
      Alert.alert('Invalid Input', 'Please select Drop Date and Drop Time');
      return;
    }
    setButtonLoader(true);
    try {
      const OrderRef = firestore().collection('Order').doc(data.id);
      await OrderRef.update({
        DropDate: data.DropDate,
        Droptime: data.droptime,
      });
      dispatch(
        updateDryClean({
          id: data.id,
          DropDate: data.DropDate,
          Droptime: data.droptime,
        }),
      );
      Navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong', 'Please try after some time');
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
          alignItems: 'center',
        }}>
        <Text style={StyleForInputs.InputTextHeader}>Edit Dry Clean Order</Text>
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
          <Text style={[StyleForInputs.InputTextHeader, {color: 'black'}]}>
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
          <Text style={[StyleForInputs.InputTextHeader, {color: 'black'}]}>
            {data.Droptime ? data.Droptime.label : 'Not Assign'}
          </Text>
        </Pressable>
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
          setData({...data, DropDate: date});
          setOpenDropDate(false);
        }}
      />
      <CustomDropdown
        keyAccess={'id'}
        access={'label'}
        customDropdownRef={dropTimeRef}
        noDataLine={'No Drop Time Available'}
        data={timeSlots}
        onPress={item => setData({...data, Droptime: item})}
        label={'Drop Time'}
      />
    </View>
  );
};

export default EditDryCleanOrder;
