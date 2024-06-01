import {View, Text, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../CreateOrder/FinalCartIroning';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../../components/UI/CustomButton';
import auth from '@react-native-firebase/auth';
import {emailValidator} from '../../../helpers/emailValidator';
import {passwordValidator} from '../../../helpers/passwordValidator';
const AddRider = () => {
  const [email, setEmail] = useState({
    value: '',
    error: '',
  });
  const [password, setPassword] = useState({
    value: '',
    error: '',
  });

  const [btnLoader, setButtonLoader] = useState(false);

  async function addRider() {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      Alert.alert('Invalid Entry', emailError || passwordError);
      return;
    }

    setButtonLoader(true);
    try {
      const riderResp = await auth().createUserWithEmailAndPassword(
        email.value,
        password.value,
      );

      Alert.alert('Rider Added', 'Rider has been added successfully.');
      
    } catch (error) {
      Alert.alert('Something Went Wrong', "Rider can't be added right now.");
    }
    setButtonLoader(false);
  }

  return (
    <KeyboardAwareScrollView
      style={{marginHorizontal: 15, marginVertical: 10}}
      contentContainerStyle={{gap: 20, marginTop: '10%'}}>
      <TextInput
        style={[styles.input, styles.addressInput]}
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        placeholder="Email of Rider"
        placeholderTextColor={'black'}
      />
      <TextInput
        style={[styles.input, styles.addressInput]}
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        placeholder="Password"
        placeholderTextColor={'black'}
      />
      <CustomButton
        showLoader={btnLoader}
        onPress={() => {
          if (!btnLoader) addRider();
        }}
        label={'Add Rider'}
      />
    </KeyboardAwareScrollView>
  );
};

export default AddRider;
