import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

const LoadingOverlay = ({message}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'small'} color={'black'} />
      <Text
        style={{fontSize: 16, fontFamily: 'Poppins-SemiBold', marginTop: 10}}>
        {message ? message : 'Please Wait ..'}
      </Text>
    </View>
  );
};

export default LoadingOverlay;
