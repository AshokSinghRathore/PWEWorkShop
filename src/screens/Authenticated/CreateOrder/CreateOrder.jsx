import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';

import CustomText from '../../../components/UI/CustomText';
import ConcernLabelButton from '../../../components/UI/ConcernLabelButton';
const CreateOrder = ({navigation}) => {
  return (
    <>
      <CustomText
        customStyle={{textAlign: 'center', color: 'black', marginTop: 30}}>
        What are you looking {'\n'}for?
      </CustomText>
      <View style={{marginTop: 70, alignItems: 'center'}}>
        <ConcernLabelButton
          onPress={() => navigation.navigate('IronScreen')}
          label={'Ironing'}
          customStyle={{
            height: 60,
          }}
          labelStyle={{
            fontSize: 25,
          }}
        />
        <ConcernLabelButton
          onPress={() => navigation.navigate('DryClean')}
          label={'DryClean'}
          customStyle={{
            height: 60,
          }}
          labelStyle={{
            fontSize: 25,
          }}
        />
      </View>
    </>
  );
};

export default CreateOrder;
const styles = StyleSheet.create({});
