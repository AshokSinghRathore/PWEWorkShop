import Navigation from './src/navigation/Navigation';
import {StatusBar} from 'react-native';
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
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// const App = () => {
//   return (
//     <View>
//       <Text
//         onPress={async () => {
//           try {
//             // logout the user
//             // await auth().signOut();
//             const data = await firestore().collection('States').get();
//             data.docs.forEach(doc => {
//               console.log(doc.data());
//             });
//           } catch (error) {
//             console.log(error);
//           }
//         }}>
//         App
//       </Text>
//     </View>
//   );
// };

// export default App;