import Navigation from './src/navigation/Navigation';
import { Alert, StatusBar } from 'react-native';


const App = () => {


  return (
    <>
      <StatusBar backgroundColor={'#1ca3ac'} barStyle={'light-content'} />
      <Navigation />
    </>
  );
};

export default App;

// import {View, Text} from 'react-native';
// import React from 'react';
// import Test from './Test';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// const Stack = createStackNavigator();
// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}

//         />
//         <Stack.Screen name="Test" component={Test} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


// function HomeScreen(
//   {
//     navigation
//   }
// ) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text onPress={() => navigation.navigate('Test')}>Test</Text>
//     </View>
//   );
// }




