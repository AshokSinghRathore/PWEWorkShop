import {
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View} from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ServicePinCodeInputModal from '../../components/login/ServicePinCodeInputModal';
import ShowServicePinCode from '../../components/login/ShowServicePinCode';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setCred} from '../../feature/all-feature/feature-cred';
import CustomButton from '../../components/UI/CustomButton';
const UserDetails = () => {
  const [Name, setName] = useState('');
  const [Mobile, setMobile] = useState('');
  const [isServicePinCodeModalVisible, setIsServicePinCodeModalVisible] =
    useState(false);

  const [allServicePinCodes, setAllServicePinCodes] = useState([]);
  const [submitLoader, setSubmitLoader] = useState(false);
  const Dispatch = useDispatch();
  async function onSubmit() {
    if (submitLoader) return;
    if (!Name || !Mobile || allServicePinCodes.length <= 0) {
      Alert.alert('Invalid Entry', 'Please fill all the required fields');
      return;
    }
    setSubmitLoader(true);
    try {
      const batch = firestore().batch();
      allServicePinCodes.forEach(item => {
        batch.update(firestore().doc(item.pathRef), {
          workShopAddress: item.workShopAddress,
          adminUid: auth().currentUser.uid,
        });
      });
      batch.set(firestore().collection('Admins').doc(auth().currentUser.uid), {
        Name: Name,
        Mobile: Mobile,
        createdAt: new Date(),
      });
      await batch.commit();
      const token = await auth().currentUser.getIdToken();
      console.log(token);
      Dispatch(setCred({token: token}));
    } catch (error) {
      Alert.alert('Something went wrong', 'Please try again later');
      console.log(error);
    }
    setSubmitLoader(false);
  }
  function onAddServicePinCode(data) {
    const isExits = allServicePinCodes.some(
      item => item.pathRef === data.pathRef,
    );
    if (isExits) {
      Alert.alert('Alert', 'Service Pin Code Already Exists');
      return;
    }
    setAllServicePinCodes([...allServicePinCodes, data]);
    setIsServicePinCodeModalVisible(false);
  }
  return (
    <KeyboardAwareScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView style={{marginHorizontal: 10, marginTop: 20}}>
        <Text style={StyleForInputs.HeaderText}>Enter Your Details</Text>

        <View style={StyleForInputs.hr}></View>
        <View style={StyleForInputs.TextInputContainer}>
          <Text style={StyleForInputs.InputTextHeader}>Name</Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor={'#414a4c'}
            value={Name}
            onChangeText={e => setName(e)}
            style={StyleForInputs.Inputstyle}
          />
          <Text style={StyleForInputs.InputTextHeader}>Email</Text>
          <TextInput
            placeholder="Mobile"
            placeholderTextColor={'#414a4c'}
            value={Mobile}
            onChangeText={e => {
              if (e == '' || e.match(/[0-9]/)) {
                setMobile(e);
              }
            }}
            keyboardType="number-pad"
            style={StyleForInputs.Inputstyle}
          />
          <View style={ServicePinCodeStyle.container}>
            <View style={ServicePinCodeStyle.navbar}>
              <Text style={ServicePinCodeStyle.textStyle}>
                Your Service PinCodes{' '}
              </Text>
              <Pressable
                style={{
                  flexDirection: 'row',
                  width: 100,
                  justifyContent: 'flex-end',
                }}
                onPress={() => setIsServicePinCodeModalVisible(true)}>
                <AntDesign size={24} color="black" name="pluscircleo" />
              </Pressable>
            </View>
            <ShowServicePinCode data={allServicePinCodes} />
          </View>
        </View>
      </SafeAreaView>
      <CustomButton
        buttonStyle={{marginTop: 40}}
        label="Submit"
        onPress={onSubmit}
        showLoader={submitLoader}
      />
      <Text style={{fontSize: 24, color: 'white'}}>space</Text>
      <ServicePinCodeInputModal
        closeModal={() => setIsServicePinCodeModalVisible(false)}
        isVisible={isServicePinCodeModalVisible}
        addPinCode={onAddServicePinCode}
      />
    </KeyboardAwareScrollView>
  );
};

export default UserDetails;

export const ServicePinCodeStyle = StyleSheet.create({
  container: {
    padding: 8,
    marginVertical: 5,
    width: '100%',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: 'grey',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
});

export const StyleForInputs = StyleSheet.create({
  HeaderText: {fontSize: 20, color: 'black', fontFamily: 'Poppins-SemiBold'},
  TextInputContainer: {
    marginTop: 30,
  },
  InputTextHeader: {
    fontSize: 16,
    color: 'grey',
    fontFamily: 'Poppins-SemiBold',
  },
  Inputstyle: {
    marginTop: 10,
    width: '100%',
    padding: 10,
    backgroundColor: '#e8f7ee',
    borderRadius: 10,
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
  },
  SumbitButtonStyle: {
    width: '90%',
    backgroundColor: 'black',
    padding: 10,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  SumbitButtonTextStyle: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  hr: {width: '100%', height: 1, backgroundColor: 'black'},
});
