import {View, Text, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import {StyleForInputs} from '../../screens/Authenticated/Profile/EditProfile';
import {formatDate} from '../../helpers/DateFunction';
const EditDryCleanOrder = ({route}) => {
  const {data, setData} = route.params;
  const [openDropDate, setOpenDropDate] = useState(false);
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
    </View>
  );
};

export default EditDryCleanOrder;
