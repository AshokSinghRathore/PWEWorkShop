import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Authenticated from './Authenticated';
import Auth from './Auth';
import {useSelector} from 'react-redux';
const Navigation = () => {
  const Cred = useSelector(state => state.Cred);
  return (
    <NavigationContainer>
      {Cred.token && <Authenticated />}
      {!Cred.token && <Auth />}
    </NavigationContainer>
  );
};

export default Navigation;
