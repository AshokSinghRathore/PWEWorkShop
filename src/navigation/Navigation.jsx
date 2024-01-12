import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../store';
import Authenticated from './Authenticated';
import Auth from './Auth';
const Navigation = () => {
    const Authctx = React.useContext(AuthContext);

  return (
   <NavigationContainer>
    {Authctx.isAuthenticated&&<Authenticated/>}
    {!Authctx.isAuthenticated&&<Auth/>}
   </NavigationContainer>
  )
}

export default Navigation