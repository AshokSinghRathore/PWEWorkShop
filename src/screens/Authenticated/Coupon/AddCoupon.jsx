import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import {AppColors} from '../../../constants/color';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../../../components/UI/CustomButton';
import {addCouponRedux} from '../../../feature/all-feature/feature-coupon';
const AddCoupon = ({navigation}) => {
  const [couponCode, setCouponCode] = useState('HOLI13');
  const Cred = useSelector(state => state.Cred);
  const [offer, setOffer] = useState('10');
  const [loader, setLoader] = useState(false);
  const [dashBoardMsg,setDashBoardMsg] = useState("HOLI 14 - Use for discount")
  const Dispatch = useDispatch();
  const ServicePinCode = useSelector(
    state => state.ServicePinCode.planePinCodeArray,
  );
  const handleSubmit = async () => {
    if (!couponCode || !offer||!dashBoardMsg) {
      Alert.alert('Incomplete Detail', 'Kindly Enter All Detail');
      return;
    }
    setLoader(true);
    try {
      const couponData = {
        couponCode: couponCode,
        offer: parseInt(offer),
        pinCodes: ServicePinCode,
        admin_uid: Cred.uid,
        isActive:true,
        dashboardMsg:dashBoardMsg
      };
      const couponsRef = await firestore()
        .collection('Coupons')
        .add({...couponData,createdAt:new Date()});
      ToastAndroid.show('Coupon Activated', 1);
      // Dispatch(addCouponRedux({...couponData,id:couponsRef.id}));
      // navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Something went wrong',
        'Kindly Add Different Coupons, as this coupon code has been already used',
      );
    }
    setLoader(false);
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={200}
        style={[styles.container, {width: '80%'}]}>
        <Image
          source={require('../../../assets/coupon.png')}
          style={{width: 200, height: 200}}
          resizeMode="contain"
        />
        <Text style={styles.heading}>Add Coupon</Text>
        <TextInput
          placeholderTextColor="white"
          style={styles.input}
          placeholder="Dashboard MSG"
          maxLength={50}
          value={dashBoardMsg}
          onChangeText={text => setDashBoardMsg(text)}
        />
        <TextInput
          placeholderTextColor="white"
          style={styles.input}
          placeholder="Coupon Code"
          maxLength={18}
          value={couponCode}
          onChangeText={text => setCouponCode(text)}
        />
        <TextInput
          placeholderTextColor="white"
          style={styles.input}
          placeholder="Discount"
          inputMode="numeric"
          maxLength={3}
          keyboardType="numeric"
          value={offer}
          onChangeText={text => {
            if (/^\d+$/.test(text) || text == '') {
              // Check if text is a number
              const num = parseInt(text);
              if ((num >= 0 && num <= 100) || text == '') {
                setOffer(text);
              } else {
                // Alert for invalid entry (outside range)
                Alert.alert(
                  'Invalid Entry',
                  'Please enter a number between 0 and 100',
                );
              }
            } else {
              // Alert for non-numeric input
              Alert.alert('Invalid Input', 'Please enter a valid number');
            }
          }}
        />

        <CustomButton
          label={'Submit'}
          showLoader={loader}
          onPress={() => {
            if (loader) {
              return;
            }
            handleSubmit();
          }}
        />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.statusBarColor,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',

    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 20,
    padding: 10,

    fontFamily: 'Poppins-SemiBold',
  },
  submitButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCoupon;
