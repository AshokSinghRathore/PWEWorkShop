import {
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const Login = ({ navigation}) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [code, setCode] = useState('');
  const [CountryCode, setCountryCode] = useState('IN');
  const [Confirm, setConfirm] = useState(null);
  function SendCode() {
    setConfirm(true);
  }
  const [otpBoxes, setOtpBoxes] = useState(Array(6).fill(''));
  const otpInputs = useRef([]);

  const handleInputChange = (index, value) => {
    const updatedOtpBoxes = [...otpBoxes];
    updatedOtpBoxes[index] = value;
    setOtpBoxes(updatedOtpBoxes);

    if (index < otpBoxes.length - 1 && value) {
      otpInputs.current[index + 1].focus();
    }

    if (index > 0 && !value) {
      otpInputs.current[index - 1].focus();
    }
  };

  function ConfirmCode(){
    navigation.navigate("UserDetails")
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white',
      }}
      bounces={false}>
      <SafeAreaView>
        <Image
          source={require('../../assets/icon.jpeg')}
          resizeMode="contain"
          style={{
            width: 250,
            height: 250,
            alignSelf: 'center',
            top: -30,
            marginHorizontal: 10,
          }}
        />
        {!Confirm && (
          <>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'Poppins-Bold',
                textAlign: 'center',
                marginHorizontal: 10,
              }}>
              Enter Mobile Number {'\n'}Enter Your Phone Number. You Will
              Receive A 6 Digit Code
            </Text>
            <PhoneInput
              containerStyle={{
                alignSelf: 'center',

                borderColor: 'gray',
                borderRadius: 10,
                marginTop: 10,
              }}
              textContainerStyle={{borderRadius: 10}}
              defaultCode="IN"
              onChangeCountry={e => setCountryCode(e)}
              value={value}
              onChangeFormattedText={e => setFormattedValue(e)}
              onChangeText={e => setValue(e)}
            />
            <TouchableOpacity
              onPress={SendCode}
              style={{
                marginTop: 40,
                backgroundColor: '#5245c4',
                width: 200,
                height: 50,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: 'white',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Send Code
              </Text>
            </TouchableOpacity>
          </>
        )}

        {Confirm && (
          <>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              We have sent you an SMS code on
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: 'blue',
                fontFamily: 'Poppins-SemiBold',

                width: 300,

                marginBottom: 10,
              }}>
              +91-8427796715. <Text onPress={()=>setConfirm(null)} style={{color:"orange"}}>Edit Number</Text>
            </Text>
            <View style={styles.otpContainer}>
              {otpBoxes.map((value, index) => (
                <TextInput
                  key={index}
                  ref={input => (otpInputs.current[index] = input)}
                  value={otpBoxes[index]}
                  onChangeText={value => handleInputChange(index, value)}
                  keyboardType="numeric"
                  maxLength={1}
                  style={styles.otpInput}
                />
              ))}
            </View>
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Did'nt receive SMS?
                <Text
                  style={{color: 'orange'}}
                  onPress={() => setConfirm(null)}>
                  {' '}
                  Resend
                </Text>
              </Text>
            </View>

            <TouchableOpacity
              onPress={ConfirmCode}
              style={{
                marginTop: 40,
                backgroundColor: '#5245c4',
                width: 200,
                height: 50,
                borderRadius: 15,
                justifyContent: 'center',
                alignSelf:"center"
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: 'white',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Submit Code
              </Text>
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 40,
    borderBottomWidth: 1,
    marginHorizontal: 5,
    textAlign: 'center',
  },
});
