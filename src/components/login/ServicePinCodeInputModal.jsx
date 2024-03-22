import {View, Text, Modal, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import CustomDropdown from '../UI/CustomDropdown';
import Feather from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTextInput from '../UI/CustomTextInput';
import CustomButton from '../UI/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ServicePinCodeInputModal = ({isVisible, addPinCode, closeModal}) => {
  const [screenLoading, setScreenLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [stateData, setStateData] = useState([]);
  const [state, setState] = useState({});
  const [cityData, setCityData] = useState([]);
  const [city, setCity] = useState({});
  const [pinCodeData, setPinCodeData] = useState([]);
  const [pinCode, setPinCode] = useState({});
  const [syncCode, setSyncCode] = useState('');
  const [workShopAddress, setWorkShopAddress] = useState('');
  async function get() {
    if (stateData.length > 0) return;
    setScreenLoading(true);
    try {
      const stateRef = firestore().collection('States');
      const allStates = await stateRef.get();
      if (!allStates.empty) {
        setStateData(
          allStates.docs.map(doc => {
            return {...doc.data(), stateKey: doc.id};
          }),
        );
      }
    } catch (error) {
      Alert.alert('Something Went Wrong', 'Please Try After Some Time');
    }
    setScreenLoading(false);
  }
  useEffect(() => {
    get();
  }, []);

  async function getCityByStateKey(item) {
    try {
      const cityRef = firestore()
        .collection('States')
        .doc(item.stateKey)
        .collection('Cities');
      const getCity = await cityRef.get();
      if (!getCity.empty) {
        const city = [];
        getCity.forEach(doc => {
          city.push({...doc.data(), cityKey: doc.id});
        });
        setCityData(city);
      }
    } catch (error) {
      Alert.alert('Something went Wrong', 'Please Try Again Later');
      console.log(error);
    }
  }

  async function getPinCodeByCityKey(item) {
    try {
      const pinCodeRef = firestore()
        .collection('States')
        .doc(state.stateKey)
        .collection('Cities')
        .doc(item.cityKey)
        .collection('PinCodes');
      const getPinCodeData = await pinCodeRef.get();
      if (!getPinCodeData.empty) {
        const pinCode = [];
        getPinCodeData.forEach(doc => {
          pinCode.push({...doc.data(), pinCodeKey: doc.id});
        });
        setPinCodeData(pinCode);
      }
    } catch (error) {
      Alert.alert('Something went Wrong', 'Please Try Again Later');
      console.log(error);
    }
  }

  async function validateAndAddPinCode() {
    if (buttonLoader) return;
    if (
      !pinCode.pinCodeKey ||
      !city.cityKey ||
      !state.stateKey ||
      !syncCode ||
      !workShopAddress
    ) {
      return Alert.alert(
        '🛑 Form Not Filled! 🤔',
        'Oops! It looks like you forgot to fill out the form. Please make sure to complete all the required fields before submitting.🚀 And ensure all the necessary information is filled in correctly. Thank you! 😊',
      );
    }
    setButtonLoader(true);
    try {
      const resp = await firestore()
        .collection('States')
        .doc(state.stateKey)
        .collection('Cities')
        .doc(city.cityKey)
        .collection('PinCodes')
        .doc(pinCode.pinCodeKey)
        .get();

      if (resp.data().syncCode == syncCode) {
        addPinCode({
          workShopAddress: workShopAddress,
          Pincode: pinCode.pincode,
          City: city.city,
          State: state.state,
          pathRef: `States/${state.stateKey}/Cities/${city.cityKey}/PinCodes/${pinCode.pinCodeKey}`,
        });
        setWorkShopAddress('');
        setSyncCode('');
      } else {
        Alert.alert('Invalid Sync Code', 'Please Enter Correct Sync Code');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Something went Wrong', 'Please Try Again Later');
    }
    setButtonLoader(false);
  }
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
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
          <MaterialIcons
            onPress={closeModal}
            name="cancel"
            size={30}
            color={'black'}
            style={{position: 'absolute', left: 5, top: 3}}
          />
          <View style={{marginTop: 20}}></View>
          <CustomDropdown
            data={stateData}
            value={state}
            labelField={'state'}
            valueField={'stateKey'}
            onPress={item => {
              if (!(state == item)) {
                getCityByStateKey(item);
              }
              setState(item);
              setCity({});
            }}
            placeholder={'State'}
            Icon={() => <Feather color={'black'} name="map-pin" size={20} />}
          />
          <CustomDropdown
            value={city}
            data={cityData}
            labelField={'city'}
            valueField={'cityKey'}
            Icon={() => <Icon color={'black'} name="city-variant" size={20} />}
            onPress={item => {
              if (!(city == item)) {
                getPinCodeByCityKey(item);
              }
              setCity(item);
              setPinCode({});
            }}
            placeholder={'City'}
          />
          <CustomDropdown
            Icon={() => (
              <Icon2 color={'black'} name="envelope-letter" size={20} />
            )}
            data={pinCodeData}
            value={pinCode}
            labelField={'pincode'}
            valueField={'pinCodeKey'}
            onPress={item => {
              setPinCode(item);
            }}
            placeholder={'PinCode'}
          />
          <CustomTextInput
            placeHolder={'Sync Code'}
            onChangeText={text => setSyncCode(text)}
            value={syncCode}
            placeHolderColor={'grey'}
            Style={{
              width: '80%',
              marginTop: 10,
              backgroundColor: '#e8f7ee',
              borderWidth: 0.5,
              borderColor: 'grey',
            }}
          />
          <CustomTextInput
            placeHolder={'WorkShop Address'}
            onChangeText={text => setWorkShopAddress(text)}
            value={workShopAddress}
            placeHolderColor={'grey'}
            Style={{
              width: '80%',
              marginTop: 10,
              backgroundColor: '#e8f7ee',
              borderWidth: 0.5,
              borderColor: 'grey',
            }}
          />
          <CustomButton
            label={'Add'}
            buttonStyle={{
              marginTop: 15,
            }}
            showLoader={buttonLoader}
            onPress={validateAndAddPinCode}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ServicePinCodeInputModal;
