import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {AppColors} from '../../../constants/color';
import * as Animatable from 'react-native-animatable';

const AddCoupon = ({navigation}) => {
  const [couponCode, setCouponCode] = useState('');
  const [offer, setOffer] = useState('');

  const handleSubmit = () => {
    navigation.goBack();
    // Here, you can handle the submission of the coupon code and offer data.
    // For example, you can make an API call to save the data to the server.
    // Replace the console.log with your desired logic.
    console.log('Coupon Code:', couponCode);
    console.log('Offer:', offer);
    // After submission, you may want to navigate to another screen or display a success message.
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={200}
        style={[styles.container,{width
        :"80%"}]}>
        <Image
          source={require('../../../assets/coupon.png')}
          style={{width: 200, height: 200}}
          resizeMode="contain"
        />
        <Text style={styles.heading}>Add Coupon</Text>
        <TextInput
          placeholderTextColor="white"
          style={styles.input}
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChangeText={text => setCouponCode(text)}
        />
        <TextInput
          placeholderTextColor="white"
          style={styles.input}
          placeholder="Enter Offer"
          value={offer}
          onChangeText={text => setOffer(text)}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
