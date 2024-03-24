import {Image, Text, StyleSheet, SafeAreaView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../../components/UI/CustomTextInput';
import CustomButton from '../../components/UI/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {emailValidator} from '../../helpers/emailValidator';
import {passwordValidator} from '../../helpers/passwordValidator';
import {useDispatch} from 'react-redux';
import {setCred} from '../../feature/all-feature/feature-cred';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import {getItem, setItem} from '../../helpers/AsyncStorageFunctions';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLoader, setButtonLoader] = useState(false);
  const Dispatch = useDispatch();
  const [autoLogin, setAutoLogin] = useState(false);

  const handleLogin = async () => {
    if (buttonLoader) return;
    const emailError = emailValidator(email);
    const passwordError = passwordValidator(password);
    if (emailError || passwordError) {
      Alert.alert('Invalid Entry', emailError || passwordError);
      return;
    }
    setButtonLoader(true);
    try {
      const authResp = await auth().signInWithEmailAndPassword(email, password);
      const adminExist = await firestore()
        .collection('Admins')
        .doc(authResp.user.uid)
        .get();
      if (!adminExist.exists) {
        navigation.navigate('UserDetails');
      } else {
        const token = await authResp.user.getIdToken();
        let userInfo = await firestore()
          .collection('Admins')
          .doc(authResp.user.uid)
          .get();
        delete userInfo.data().createdAt;
        await setItem('token', token);
        await setItem('uid', authResp.user.uid);
        Dispatch(setCred({token, ...userInfo.data(), uid: authResp.user.uid}));
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Invalid Entry', 'User Not Found');
      } else if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/user-disabled' ||
        error.code === 'auth/invalid-credential'
      ) {
        Alert.alert('Invalid Entry', 'Invalid Email or Password');
      } else {
        Alert.alert('Something went wrong', 'Please try again later');
      }
    }
    setButtonLoader(false);
  };

  async function onAutoLogin() {
    setAutoLogin(true);
    try {
      const uid = await getItem('uid');
      const token = await getItem('token');
      if (uid && token) {
        console.log(auth().currentUser)
        let userInfo = await firestore().collection('Admins').doc(uid).get();
        delete userInfo.data().createdAt;
        Dispatch(setCred({token, ...userInfo.data(), uid}));
      }
    } catch (error) {
    }
    setAutoLogin(false);
  }

  useEffect(() => {
    onAutoLogin();
  }, []);

  return (
    <>
      {autoLogin ? (
        <LoadingOverlay />
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'white',
          }}
          bounces={false}>
          <SafeAreaView style={{width: '100%'}}>
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

            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'Poppins-Bold',
                textAlign: 'center',
                marginHorizontal: 10,
              }}>
              Enter your Email and Password
            </Text>
            <CustomTextInput
              value={email}
              onChangeText={setEmail}
              placeHolder="Enter Email"
              placeHolderColor={'grey'}
            />
            <CustomTextInput
              value={password}
              onChangeText={setPassword}
              placeHolder="Enter password"
              placeHolderColor={'grey'}
              secure
            />
            <CustomButton
              label={'Continue'}
              onPress={handleLogin}
              showLoader={buttonLoader}
            />
          </SafeAreaView>
        </KeyboardAwareScrollView>
      )}
    </>
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
