import {
  SafeAreaView,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View} from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import ShowServicePinCode from '../../../components/login/ShowServicePinCode';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {clearCred} from '../../../feature/all-feature/feature-cred';
import {removeItem} from '../../../helpers/AsyncStorageFunctions';
import auth from '@react-native-firebase/auth';
const EditProfile = ({navigation}) => {
  const Cred = useSelector(state => state.Cred);
  const [Name, setName] = useState(Cred.Name);
  const [Mobile, setMobile] = useState(Cred.Mobile);
  const ServicePinCode = useSelector(state => state.ServicePinCode);
  const Dispatch = useDispatch();
  async function onSubmit() {
    navigation.goBack();
  }

  async function onLogOut() {
    try {
      Dispatch(clearCred());
      await removeItem('token');
      await removeItem('uid');
      auth().signOut();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView style={{marginHorizontal: 10, marginTop: 20}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={StyleForInputs.HeaderText}>View Profile</Text>
          <Pressable
            onPress={() =>
              Alert.alert(
                'Are you sure ?',
                'Are you sure you want to logout ?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'Log Out', onPress: onLogOut},
                ],
              )
            }
            style={{paddingHorizontal: 10}}>
            <SimpleLineIcons name="login" color="black" size={30} />
          </Pressable>
        </View>
        <View style={StyleForInputs.hr}></View>
        <View style={StyleForInputs.TextInputContainer}>
          <Text style={StyleForInputs.InputTextHeader}>Name</Text>
          <TextInput
            placeholder="Enter Your Name"
            placeholderTextColor={'#414a4c'}
            value={Name}
            onChangeText={e => setName(e)}
            style={StyleForInputs.Inputstyle}
          />
          <Text style={StyleForInputs.InputTextHeader}>Mobile</Text>
          <TextInput
            placeholder="Enter Your Mobile"
            placeholderTextColor={'#414a4c'}
            value={Mobile}
            onChangeText={e => setMobile(e)}
            style={StyleForInputs.Inputstyle}
          />
          {/* <WorkShopInput
             on
          /> */}
          <ShowServicePinCode data={ServicePinCode.servicePinCodeArray} />
        </View>
      </SafeAreaView>
      {/* <TouchableOpacity
        onPress={onSubmit}
        style={StyleForInputs.SumbitButtonStyle}>
        <Text style={StyleForInputs.SumbitButtonTextStyle}>Change</Text>
      </TouchableOpacity> */}
      <Text style={{fontSize: 24, color: 'white'}}>space</Text>
    </KeyboardAwareScrollView>
  );
};

export default EditProfile;

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
  SubmitButtonStyle: {
    width: '90%',
    backgroundColor: 'black',
    padding: 10,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  Submit: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  hr: {width: '100%', height: 1, backgroundColor: 'black'},
});
