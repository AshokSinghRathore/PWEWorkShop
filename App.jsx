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
