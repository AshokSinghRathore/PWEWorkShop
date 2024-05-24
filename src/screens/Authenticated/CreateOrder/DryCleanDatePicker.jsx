import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    StyleSheet,
    FlatList,
  } from 'react-native';
  import React, {useEffect, useState, useRef} from 'react';
  import {useSelector} from 'react-redux';
  import DatePicker from 'react-native-date-picker';
  import moment from 'moment';


  import { AppColors as color } from '../../../constants/color';
import ConcernLabelButton from '../../../components/UI/ConcernLabelButton';
import { DashboardStyles } from './DryClean';
import CustomDropdown from '../../../components/CustomDropdown';
import CustomText from '../../../components/UI/CustomText';


export const fontFamily = {
    regular: 'Poppins-Regular',
    bold: 'Poppins-Bold',
    semiBold: 'Poppins-SemiBold',
    medium: 'Poppins-Medium',
    light: 'Poppins-Light',
    };

  const DryCleanDatePicker = ({navigation, route}) => {
    const Selector = useSelector(state => state.TempCartItems);
    const [pickTime, setPickTime] = useState(null);
    const PickTimemodalizeRef = useRef(null);
    const [PickDate, setPickDate] = useState(new Date());
    const [MinDate, setMinDate] = useState(new Date());
    const [OpenPickDate, setOpenPickDate] = useState(false);
    const [picktimes, setpicktimes] = useState([]);
    const Cred = useSelector(state => state.Credential);
    const openModalPickTime = () => {
      PickTimemodalizeRef.current?.open();
    };
    useEffect(() => {
      setPickTime(null);
  
      if (
        PickDate.getHours() >= 16 ||
        (PickDate.getMinutes() >= 27 && PickDate.getHours() >= 15)
      ) {
        var tempTime = PickDate;
        tempTime.setDate(tempTime.getDate() + 1);
        tempTime.setHours(8);
        tempTime.setMinutes(0);
        tempTime.setSeconds(0);
        setPickDate(tempTime);
        setMinDate(tempTime);
      }
      var totalCloth = 0;
  
      for (var i in Selector.DryClean) {
        totalCloth += parseInt(Selector.DryClean[i].Quantity);
      }
      const currTime = new Date();
      if (currTime.getDate() === PickDate.getDate()) {
        const currentTimePlusOneHour = moment(PickDate).add(1, 'hour');
  
        const filteredTimeSlots = timeSlots
          .map(timeSlot => {
            const time = moment(timeSlot.value, 'HH:mm');
            return {...timeSlot, time}; // Adding the moment object to the timeSlot object
          })
          .filter(timeSlot =>
            timeSlot.time.isAfter(currentTimePlusOneHour, 'HH:mm'),
          )
          .sort((a, b) => (a.time.isBefore(b.time, 'HH:mm') ? -1 : 1))
          .map(timeSlot => ({...timeSlot, time: timeSlot.time.format('HH:mm')})); // Convert back to the string format "HH:mm"
        setpicktimes(filteredTimeSlots);
      } else {
        setpicktimes(timeSlots);
      }
    }, [PickDate]);
  
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
      {id: 37, value: '17:00', label: '17:00 - 17:15'},
      {id: 38, value: '17:15', label: '17:15 - 17:30'},
      {id: 39, value: '17:30', label: '17:30 - 17:45'},
      {id: 40, value: '17:45', label: '17:45 - 18:00'},
      {id: 41, value: '18:00', label: '18:00 - 18:15'},
      {id: 42, value: '18:15', label: '18:15 - 18:30'},
      {id: 43, value: '18:30', label: '18:30 - 18:45'},
      {id: 44, value: '18:45', label: '18:45 - 19:00'},
      {id: 45, value: '19:00', label: '19:00 - 19:15'},
      {id: 46, value: '19:15', label: '19:15 - 19:30'},
      {id: 47, value: '19:30', label: '19:30 - 19:45'},
      {id: 48, value: '19:45', label: '19:45 - 20:00'},
      {id: 49, value: '20:00', label: '20:00 - 20:15'},
      {id: 50, value: '20:15', label: '20:15 - 20:30'},
      {id: 51, value: '20:30', label: '20:30 - 20:45'},
      {id: 52, value: '20:45', label: '20:45 - 21:00'},
    ];
  
    function onSubmit() {
      if (pickTime && PickDate) {
        navigation.navigate('FinalCartDryClean', {
          price: route.params.price,
          PickTime: pickTime.label,
          PickDate: PickDate.toISOString(),
          DropDate: false,
          DropTime: false,
          isDelete: route.params.isDelete,
          cartKey: route.params.key,
        });
      } else {
        Alert.alert(
          'Incomplete Details',
          'Please Select All the Values On The Screen.',
        );
      }
    }
  
    return (
      <>

        <SafeAreaView style={DashboardStyles.container}>
          <ConcernLabelButton
            label={'Dry Clean'}
            customStyle={{
              backgroundColor: color.secondary,
              alignSelf: 'center',
              height: 50,
              width: '89%',
            }}
          />
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <ConcernLabelButton
              label={' Select Pick Up Date & Time'}
              customStyle={{
                height: 50,
                backgroundColor: color.tertiary,
              }}
            />
  
            <View
              onPress={() => {}}
              style={{
                flexDirection: 'row',
                marginTop: 20,
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginHorizontal: 5,
                borderWidth: 1,
                borderColor: color.tertiary,
                justifyContent: 'space-between',
                width: '90%',
                alignItems: 'center',
              }}>
              <Text
                onPress={() => setOpenPickDate(!OpenPickDate)}
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  color: 'black',
                  fontFamily: fontFamily.regular,
                }}>
                {PickDate ? PickDate.toLocaleDateString('en-GB') : 'Pick Date'}
              </Text>
              <DatePicker
                modal
                minimumDate={MinDate}
                open={OpenPickDate}
                date={PickDate}
                onConfirm={date => {
                  setOpenPickDate(false);
                  setPickDate(date);
                }}
                mode="date"
                theme="light"
                onCancel={() => {
                  setOpenPickDate(false);
                }}
              />
              <Text
                onPress={openModalPickTime}
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: fontFamily.regular,
                  color: 'black',
  
                  alignSelf: 'center',
                }}>
                {pickTime ? pickTime.label : 'Pick Time'}
              </Text>
            </View>
            <CustomText
              customStyle={{
                fontSize: 16,
                color: color.secondary,
                marginTop: 20,
                textAlign: 'center',
                marginVertical: 15,
                marginHorizontal: 10,
              }}>
              NOTE: We will update the Drop time of your order in 24 Hours Track
              your order to check for details.
            </CustomText>
  
            <ConcernLabelButton
              label={'Next'}
              onPress={() => {

                  onSubmit();

              }}
              customStyle={{
                height: 50,
                backgroundColor: color.tertiary,
              }}
            />

          </ScrollView>
  
          <CustomDropdown
            access={'label'}
            customDropdownRef={PickTimemodalizeRef}
            noDataLine={'No Pick Time Available'}
            data={picktimes}
            keyAccess={'id'}
            onPress={item => setPickTime(item)}
            label={'Pick Time'}
          />
        </SafeAreaView>
      </>
    );
  };
  
  export default DryCleanDatePicker;
  
  export const ModalStyle = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    button: {
      backgroundColor: 'blue',
      padding: 15,
      borderRadius: 8,
      marginBottom: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    modal: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalContent: {
      flex: 1,
      paddingHorizontal: 10,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      padding: 10,
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
    },
    modalHeaderText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    listItem: {
      fontSize: 18,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
  });
  