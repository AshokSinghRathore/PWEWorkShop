import { createStackNavigator } from "@react-navigation/stack"
import Login from "../screens/Auth/Login"
import UserDetails from "../screens/Auth/UserDetails"

const Stack = createStackNavigator()
const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="UserDetails" component={UserDetails}/>
    </Stack.Navigator>
  )
}

export default Auth