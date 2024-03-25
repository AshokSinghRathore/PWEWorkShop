import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IroningStyles} from './AllIroning';
import {AppColors} from '../../../../constants/color';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleForInputs} from '../../../Auth/UserDetails';
import {formatDate} from '../../../../helpers/DateFunction';
import EditDryCleanOrder from '../../../../components/DryClean/EditDryCleanOrder';

const DetailedDryCleanOrder = ({route, navigation}) => {
  const [Data, setData] = useState(route.params);
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.heading}>Order Details</Text>
      </SafeAreaView>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.detailText}>
          Customer Name: <Text style={styles.valueText}>{Data?.user_name}</Text>
        </Text>
        <Text style={styles.detailText}>
          Quantity:{' '}
          <Text style={styles.valueText}>{Data?.DryClean?.length}</Text>
        </Text>
        <Text style={styles.detailText}>
          Pick Date:{' '}
          <Text style={styles.valueText}>
            {Data && Data.PickDate ? formatDate(new Date(Data.PickDate)) : ''}
          </Text>
        </Text>
        <Text style={styles.detailText}>
          Pick Time: <Text style={styles.valueText}>{Data?.Picktime}</Text>
        </Text>
        <Text style={styles.detailText}>
          Drop Date:{' '}
          <Text style={styles.valueText}>
            {Data && Data.DropDate
              ? formatDate(new Date(Data.DropDate))
              : 'Not Assign'}
          </Text>
        </Text>
        <Text style={styles.detailText}>
          Drop Time:{' '}
          <Text style={styles.valueText}>{Data?.DropTime || 'Not Assign'}</Text>
        </Text>
        <Text style={styles.detailText}>
          Address:{' '}
          <Text style={styles.valueText}>
            {Data?.Address?.House +
              ', ' +
              Data?.Address?.Area +
              ', ' +
              Data?.Address?.City +
              ', ' +
              Data?.Address?.State +
              ', ' +
              Data?.Address?.Pincode}
          </Text>
        </Text>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'grey',
            marginBottom: 10,
          }}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EditDryCleanOrder', {
              data: Data,
              setData: setData,
            })
          }
          style={StyleForInputs.SumbitButtonStyle}>
          <Text style={StyleForInputs.SumbitButtonTextStyle}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Next Drop', 'Hell Yeeaaah');
          }}
          style={StyleForInputs.SumbitButtonStyle}>
          <Text style={StyleForInputs.SumbitButtonTextStyle}>
            Update Order Status
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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
